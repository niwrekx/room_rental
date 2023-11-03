import type { Metadata } from 'next';
import {Poppins} from "next/font/google";
import './globals.css'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';


// const inter = Inter({ subsets: ['latin'] })

const font = Poppins ({ 
  subsets: ['latin'],
  weight:["100","200","300","400","500","600","700","800","900"]
});

export const metadata: Metadata = {
  title: 'AirBnB',
  description: 'Project clone sample by niwrek',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
