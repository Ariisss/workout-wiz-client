"use client"
import localFont from 'next/font/local'
import { Poppins, Roboto, Sora } from 'next/font/google'
import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from '@/components/context/AuthProvider';
import NavLayout from '@/components/general/navigation/Navigation';

const roboto = Roboto({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-roboto',
    display: "swap",
})


const sora = Sora({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-sora',
    display: "swap",
})

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-poppins',
    display: "swap",
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
          antialiased h-screen bg-gradient-to-r from-[#131313] to-[#031900]
        `}
            >
                <AuthProvider>
                    <NavLayout>
                        {children}
                    </NavLayout>
                </AuthProvider>
            </body>
        </html>
    );
}
