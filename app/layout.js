import SmoothScrolling from "@/app/components/SmoothScrolling";
import {Inter} from 'next/font/google'

import "./globals.css";

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
})

export const metadata = {
    title: "Shashank Prasanna",
    description: "Shashank Prasanna's personal website and portfolio",
};

export default function RootLayout({children}) {
    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <html lang="en" className={`ff-no-scrollbar ${inter.variable}`}>
                <body>
                    <SmoothScrolling>
                        {children}
                    </SmoothScrolling>
                </body>
            </html>
        </>
    );
}
