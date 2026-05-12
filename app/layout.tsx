import type { Metadata, Viewport } from 'next'
import './globals.css'
import BottomNav from '@/components/layout/BottomNav'
import { FormStateProvider } from '@/contexts/form-state'

export const metadata: Metadata = {
  title: 'ShapeApp',
  description: 'Seu app de recomposição corporal',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'default', title: 'ShapeApp' },
}

export const viewport: Viewport = {
  themeColor: '#0f0f0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0f0f0f] text-white min-h-screen antialiased">
        <FormStateProvider>
          <main className="pb-20 min-h-screen max-w-md mx-auto">
            {children}
          </main>
          <BottomNav />
        </FormStateProvider>
      </body>
    </html>
  )
}
