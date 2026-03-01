import "./globals.css";
import PromoBar from "../../components/layout/PromoBar";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL("https://YOUR_DOMAIN_HERE.com.au"),
  openGraph: {
    title: site.name,
    description: site.description,
    url: "https://YOUR_DOMAIN_HERE.com.au",
    siteName: site.name,
    locale: "en_AU",
    type: "website",
  },
  alternates: {
    canonical: "https://YOUR_DOMAIN_HERE.com.au",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900">
        <PromoBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
