import '@radix-ui/themes/styles.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'
import { Container, Theme } from '@radix-ui/themes'
import AuthProvider from './auth/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Issue Tracker'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Theme accentColor='plum' grayColor='slate'>
          <AuthProvider>
            <NavBar />
            <main className='p-5'>
              <Container>{children}</Container>
            </main>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  )
}
