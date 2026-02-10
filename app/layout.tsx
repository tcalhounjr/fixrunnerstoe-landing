import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Runner's Toe - Performance Protection",
  description: "Stay in the game with professional-grade runner's toe protection",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
