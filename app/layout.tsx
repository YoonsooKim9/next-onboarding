import ToasterProvider from './provider/ToasterProvider'
import Navbar from './components/navbar/Navbar'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import RentModal from './components/modals/RentModal'

import './globals.css'
import { Nunito } from 'next/font/google'
import getCurrentUser from './actions/getCurrentUser'
import { SafeUser } from './types'
import SearchModal from './components/modals/SearchModal'

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
        <ToasterProvider />
        <SearchModal />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser as SafeUser} />
        <div className='pb-20 pt-28'>{children}</div>
      </body>
    </html>
  )
}
