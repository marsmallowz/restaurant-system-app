import NavBar from "@/components/NavBar";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant System App",
  description: "Test Code Challenge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <main className="flex min-h-screen flex-col items-center justify-between py-10 px-1.5 sm:px-10 max-w-screen-sm mx-auto">
          <div className="flex flex-col gap-3 w-full">
            <NavBar />
            <div className="flex flex-col space-y-4 bg-slate-100 py-5 px-1.5 sm:px-5 rounded-md">
              {children}
            </div>
            <div className="text-center text-sm text-gray-500">
              Semua data hanya disimpan di Local Storage browser Anda
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
