import type { Metadata } from 'next';
import {Poppins} from "next/font/google";
import './globals.css'
import Navbar from '@/app/components/navbar/Navbar';
import ClientOnly from '@/app/components/ClientOnly';
import RegisterModal from '@/app/components/modals/RegisterModal';
import LoginModal from './components/modals/LoginModal';
import RentModal from './components/modals/RentModal';

import ToasterProvider from '@/app/providers/ToasterProvider';

import getCurrentUser from './actions/getCurrentUser';
import SearchModal from './components/modals/SearchModal';



const font = Poppins ({ 
  subsets: ['latin'],
  weight:["100","200","300","400","500","600","700","800","900"]
});

export const metadata: Metadata = {
  title: 'AirBnB',
  description: 'Project clone sample by niwrek',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // get current user
  const currentUser = await getCurrentUser();


  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <RentModal />
          <LoginModal />
          <RegisterModal />
          <Navbar currentUser={currentUser}/>
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>        
      </body>
    </html>
  )
}
