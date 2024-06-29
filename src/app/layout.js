import { Inter, Roboto, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
 });
const roboto = Roboto({
  weight: ['400','700'],
  subsets: ["latin"],
  variable: '--font-roboto',
 });
 const outfit = Outfit({
  weight: ['400','700'],
  subsets: ["latin"],
  variable: '--font-outfit',
 });

export const metadata = {
  title: "PDFfile",
  description: "Chaat  with your documents",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`{inter.variable} ${roboto.variable} ${outfit.variable}`}>{children}</body>
    </html>
  );
}
