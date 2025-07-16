import {Inter, Poppins, Ubuntu_Mono} from 'next/font/google'

import "./globals.css";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: '700'
})

const ubuntu = Ubuntu_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-ubuntu',
    weight: '400',
})


export const metadata = {
    title: "Shashank Prasanna",
    description: "Shashank Prasanna's personal website and portfolio",
};

export default function RootLayout({children}) {
    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <html lang="en" className={`${inter.variable} ${poppins.variable} ${ubuntu.variable}`} suppressHydrationWarning>
                <body>
                    {children}
                </body>
            </html>
        </>
    );
}
