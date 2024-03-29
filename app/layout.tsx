import ToasterProvider from './providers/ToasterProvider'
import ReactQueryProvider from './providers/ReactQueryProvider'
import Navbar from './components/navbar/Navbar'

import './globals.css'
import { Nunito } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import { SafeUser } from '@/type'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang='en'>
      <body className={font.className}>
        <ReactQueryProvider>
          <ToasterProvider />
          <Navbar currentUser={currentUser as SafeUser} />
          <div className='pb-20 pt-28'>{children}</div>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
