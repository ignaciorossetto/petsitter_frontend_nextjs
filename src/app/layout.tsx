import { UserContextProvider } from '@/hooks/auth/authContext'
import './globals.css'
import { Inter } from 'next/font/google'
import { AdminContextProvider } from '@/hooks/auth/adminContext'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>
          <AdminContextProvider>
            <UserContextProvider>
              {children}
            </UserContextProvider>
          </AdminContextProvider>
        </Suspense>
        </body>
    </html>
  )
}
