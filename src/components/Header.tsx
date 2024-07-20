import Image from 'next/image'
import Link from 'next/link'
import { UploadButton } from './UploadButton'

export function Header() {
  return (
    <header className="h-12 flex px-2 justify-between items-center md:h-16 md:px-6 lg:px-12 shadow">
      <Link href="/">
        <Image
          className="h-11 w-auto"
          src="/FULL_LOGO_COLOR.png"
          alt="Learnwell logo"
          priority
          width={315}
          height={87}
        />
      </Link>

      <UploadButton />
    </header>
  )
}
