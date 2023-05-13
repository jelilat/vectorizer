import { Providers } from './providers'

export const metadata = {
  title: 'Vectorizer - Vector embedded greenfield storage',
  description: 'Vector embedded greenfield storage',
  image: '/vectorizer.png',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
