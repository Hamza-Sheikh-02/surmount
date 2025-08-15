import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LoadingProvider } from "@/components/LoadingProvider";
import { ViewTransitions } from "next-view-transitions";

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
        <body className="font-helvetica">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LoadingProvider>{children}</LoadingProvider>
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
