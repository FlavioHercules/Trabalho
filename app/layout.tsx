import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IRRIGATEC | Gestão inteligente da irrigação',
  description:
    'Plataforma demonstrativa para monitoramento e gestão inteligente da irrigação agrícola.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#101715',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
