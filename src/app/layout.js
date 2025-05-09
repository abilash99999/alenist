import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./header";
import Footer from "./footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Alenist",
  description: "Alenist Employee Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/alenist.png" />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          {/* Header */}
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
