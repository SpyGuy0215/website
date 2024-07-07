import SmoothScrolling from "@/app/components/SmoothScrolling";

import "./globals.css";

export const metadata = {
    title: "Shashank Prasanna",
    description: "Shashank Prasanna's personal website and portfolio",
};

export default function RootLayout({children}) {
    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <html lang="en" className={'ff-no-scrollbar'}>
                <body>
                    <SmoothScrolling>
                        {children}
                    </SmoothScrolling>
                </body>
            </html>
        </>
    );
}
