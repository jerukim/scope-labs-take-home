import './globals.css'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/LOGO_ICON.png'
import { UploadButton } from '@/components/UploadButton'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <header className="h-12 flex px-2 justify-between items-center">
          <Link href="/">
            <Image
              className="size-11"
              src={logo}
              alt="Learnwell logo"
              priority
            />
          </Link>

          <UploadButton />
        </header>
        {children}
      </body>
    </html>
  )
}
