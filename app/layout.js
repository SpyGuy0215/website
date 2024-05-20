import "./globals.css";

export const metadata = {
  title: "Shashank Prasanna",
  description: "Shashank Prasanna's personal website and portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >{children}</body>
    </html>
  );
}
