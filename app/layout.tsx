import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from '@clerk/themes'
import { SupplementContextProvider } from "@/store/SupplementContext";
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "VitaCheck",
  description: "Your Super-Smart Supplement Categorizer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider appearance={{
        baseTheme: dark,
        variables: {colorPrimary: '#36d399'},    
      }}>
        <SupplementContextProvider>
          <NavBar />
          {children}
          <Toaster />
        </SupplementContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
