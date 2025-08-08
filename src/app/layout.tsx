import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import font from "next/font/local";
import { ViewTransitions } from 'next-view-transitions';

const candelaDark = font({
  src: "../fonts/CanelaDeck-Regular.otf",
  display: "swap",
  variable: "--font-canela",
});

export const metadata: Metadata = {
  title: "Surmount",
  description: "Surmount",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={candelaDark.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
