import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Roboto } from "next/font/google";
import MyState from "@/context/MyState";
import "./globals.css";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import Providers from "@/components/provider";
import { Footer, Navbar } from "@/components";

const roboto = Roboto({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: {
    default: "e-commerce",
    template: "e-commerce - %s",
  },
  description: "Ecommerce Home Page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={roboto.className}>
        <NextTopLoader color="#22c55e" height={3} showSpinner={false} />
        <Providers>
          <main className="min-h-screen mx-auto max-w-screen-xl">
            <MyState>
              <Navbar />
              {children}
              <Footer />
            </MyState>
          </main>
        </Providers>
        <ToastContainer position="top-center" autoClose={1500} />
      </body>
    </html>
  );
}
