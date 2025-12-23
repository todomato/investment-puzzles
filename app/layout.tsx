import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        <Navbar />
        <div className="flex-grow w-full max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            <main className="flex-1 min-w-0">
              {children}
            </main>
            <Sidebar />
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
