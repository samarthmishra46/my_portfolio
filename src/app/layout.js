import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Samarth Mishra — Full-Stack & GenAI Developer',
  description:
    'Full-stack developer and GenAI engineer building production AI features with the Claude SDK, Next.js, and MongoDB. Available for freelance work.',
  metadataBase: new URL('https://samarthmishra.xyz'),
  openGraph: {
    title: 'Samarth Mishra — Full-Stack & GenAI Developer',
    description:
      'Full-stack developer shipping AI features to production. Freelance available.',
    url: 'https://samarthmishra.xyz',
    siteName: 'Samarth Mishra',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
