import type { Metadata } from "next";
import { Geist, Inter  } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import { SavedBlogsProvider } from "@/context/SavedBlogsContext";
import Footer from "@/components/Footer";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "FreePen ",
  description: "Express, Share, Create, Connect"
,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${inter.variable} antialiased`}
      >
        
         <AuthProvider>
         <SavedBlogsProvider>
         <Navbar />
    
         {children}
         <Footer/>
         </SavedBlogsProvider>
         </AuthProvider>
      </body>
    </html>
  );
}
