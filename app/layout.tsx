import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ツール制作抽選システム',
  description: '動的確率の抽選システム',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}