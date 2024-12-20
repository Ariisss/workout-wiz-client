"use client"
import localFont from 'next/font/local'
import { Poppins, Roboto, Sora } from 'next/font/google'
import type { Metadata } from "next";
import AuthProvider from '@/components/context/AuthProvider';
import NavLayout from '@/components/general/navigation/Navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

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
    title: "Workout Wizard",
    description: "AI-powered workout planner and journalizer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className='dark' suppressHydrationWarning={true}>
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
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    toastClassName={"bg-background-darkest"}
                />
                <AuthProvider>
                    <NavLayout>
                        {children}
                    </NavLayout>
                </AuthProvider>
            </body>
        </html>
    );
}
