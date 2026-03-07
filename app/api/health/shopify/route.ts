import { getShopInfo } from '@/lib/shopify'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const shop = await getShopInfo()
    return NextResponse.json({
      status: 'connected',
      shopName: shop.name,
      domain: shop.primaryDomain.url,
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
