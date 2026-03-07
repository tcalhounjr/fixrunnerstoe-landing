# Shopify API Authentication

## Context

When setting up the Shopify integration for this headless storefront, we needed a way to authenticate requests to the **Storefront API** — the API designed for frontend product queries, cart management, and checkout.

---

## What Shopify Documentation Says

Shopify's current documentation ([Client Credentials Grant](https://shopify.dev/docs/apps/build/authentication-authorization/access-tokens/client-credentials-grant)) describes a new OAuth 2.0 flow for app authentication:

```bash
POST https://{shop}.myshopify.com/admin/oauth/access_token

Body:
  grant_type=client_credentials
  client_id={client_id}
  client_secret={client_secret}
```

The docs state the token **expires after 24 hours**, and must be refreshed by repeating the request.

---

## What We Discovered

The client credentials grant **works**, but it returns an Admin API token (`shpat_` prefix), not a Storefront API token:

```json
{
  "access_token": "shpat_...",
  "scope": "read_products,unauthenticated_read_product_listings,...",
  "expires_in": 86399
}
```

Despite including `unauthenticated_*` (Storefront) scopes in the response, this token is **rejected** by the Storefront API endpoint (`/api/2026-01/graphql.json`) when passed via `X-Shopify-Storefront-Access-Token`. It only works against the Admin API endpoint (`/admin/api/2026-01/graphql.json`) using `X-Shopify-Access-Token`.

This is a meaningful distinction:

| | Admin API token (`shpat_`) | Storefront API token |
|---|---|---|
| Endpoint | `/admin/api/.../graphql.json` | `/api/.../graphql.json` |
| Header | `X-Shopify-Access-Token` | `X-Shopify-Storefront-Access-Token` |
| Expires | 24 hours | Never |
| Safe for frontend? | No | Yes |
| Cart mutations | No | Yes |

For a headless storefront we specifically need the Storefront API because:
- Cart creation, line item management, and checkout are Storefront API features
- The Storefront API is designed for public browser access (no secret required)
- Tokens don't expire, simplifying the architecture

---

## How We Solved It

The Admin API exposes a mutation — `storefrontAccessTokenCreate` — that generates a **permanent** Storefront API access token. We used the short-lived Admin API token (from the client credentials grant) as a bootstrap credential to call this mutation once:

```bash
curl -X POST \
  "https://fixrunnerstoe.myshopify.com/admin/api/2026-01/graphql.json" \
  -H "Content-Type: application/json" \
  -H "X-Shopify-Access-Token: shpat_..." \
  -d '{
    "query": "mutation {
      storefrontAccessTokenCreate(input: { title: \"Fix Runners Toe Frontend\" }) {
        storefrontAccessToken {
          accessToken
          title
          createdAt
        }
        userErrors { field message }
      }
    }"
  }'
```

Response:

```json
{
  "data": {
    "storefrontAccessTokenCreate": {
      "storefrontAccessToken": {
        "accessToken": "22e0202eb1abe0b005805594167f28cc",
        "title": "Fix Runners Toe Frontend",
        "createdAt": "2026-03-06T03:27:05Z"
      },
      "userErrors": []
    }
  }
}
```

This token never expires. Although Shopify considers it "public-safe", we store it server-side only (no `NEXT_PUBLIC_` prefix) since all Shopify calls happen in Next.js Server Components and Route Handlers — the token never needs to reach the browser.

---

## Result

The permanent token is stored as:

```
SHOPIFY_STOREFRONT_ACCESS_TOKEN=22e0202eb1abe0b005805594167f28cc
```

And used in `lib/shopify/client.ts` via the `X-Shopify-Storefront-Access-Token` header against `https://fixrunnerstoe.myshopify.com/api/2026-01/graphql.json`.

---

## Notes

- Shopify allows a maximum of **100 Storefront API access tokens** per store. They can be viewed and deleted in the Shopify Admin under **Apps → [Your App] → API credentials**.
- If the token ever needs to be rotated, repeat the `storefrontAccessTokenCreate` mutation with a new Admin API token (obtained via client credentials) and update `.env.local`.
- The Admin API credentials (`SHOPIFY_CLIENT_ID`, `SHOPIFY_CLIENT_SECRET`) are no longer needed in `.env.local` and have been removed.
