import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EasyioLabs - Learn Electronics the Easy Way",
  description: "Quick, easy and to the point electronics tutorials for Arduino, ESP32, ESP8266, and basic electronics. Learn with step-by-step guides and practical projects.",
  keywords: "Arduino, ESP32, ESP8266, electronics, tutorials, sensors, IoT, programming, microcontrollers",
  authors: [{ name: "EasyioLabs" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen bg-white text-gray-900 flex flex-col`}
      >
        <Header />
        <Breadcrumb />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
