import './globals.css'
import { Header } from '@/components/Header'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <Header />
        <main className="flex flex-col md:p-6 lg:px-12">
          {children}
        </main>
      </body>
    </html>
  )
}
