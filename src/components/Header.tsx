import Image from 'next/image'
import Link from 'next/link'
import { UploadButton } from './UploadButton'

export function Header() {
  return (
    <header className="h-12 flex px-2 justify-between items-center">
      <Link href="/">
        <Image
          className="size-11"
          src="/LOGO_ICON.png"
          alt="Learnwell logo"
          priority
          width={44}
          height={44}
        />
      </Link>

      <UploadButton />
    </header>
  )
}
