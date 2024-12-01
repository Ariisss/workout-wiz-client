import localFont from 'next/font/local'
import { Poppins, Roboto, Sora } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto'
})


const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sora'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-poppins'
})

const bramhamSerif = localFont({
  src: "./fonts/BramhamSerif.otf",
  variable: "--font-bramham-serif",

})


const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='dark'>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`
          ${bramhamSerif.variable} ${poppins.variable} ${sora.variable} ${roboto.variable}
          antialiased h-screen
        `}
      >
        {children}
      </body>
    </html>
  );
}
