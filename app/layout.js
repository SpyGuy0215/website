import SmoothScrolling from "@/app/components/SmoothScrolling";

import "./globals.css";

export const metadata = {
    title: "Shashank Prasanna",
    description: "Shashank Prasanna's personal website and portfolio",
};

export default function RootLayout({children}) {
    return (
        <html lang="en" className={'ff-no-scrollbar scroll-smooth'}>
            <body>
                <SmoothScrolling>
                    {children}
                </SmoothScrolling>
            </body>
        </html>
    );
}
