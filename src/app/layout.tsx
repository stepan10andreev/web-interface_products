import { Providers } from '@/components/providers/Providers'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
