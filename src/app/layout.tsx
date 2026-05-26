import "./globals.css";
import "@/lib/fontawesome";
import { Toaster } from "react-hot-toast";

import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
        <Toaster position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}