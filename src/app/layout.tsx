import "./globals.css";

import "@/lib/fontawesome";

import { Toaster } from "react-hot-toast";

import Script from "next/script";

import Navbar from "@/components/navbar";

import Footer from "@/components/footer";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning className={cn("font-sans", geist.variable)}
    >
      <body>

        <ThemeProvider>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" />
        </ThemeProvider>

        {/* Razorpay */}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  );
}