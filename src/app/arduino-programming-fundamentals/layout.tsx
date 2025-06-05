import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arduino Programming Fundamentals - Learn Programming the Fun Way | EasyioLabs",
  description: "Master Arduino programming through fun analogies, interactive challenges, and hands-on projects. Perfect for absolute beginners with zero programming experience. Learn variables, functions, loops, and conditions with engaging examples.",
  keywords: "Arduino programming, learn programming, Arduino tutorial, programming for beginners, Arduino fundamentals, interactive programming, Arduino simulator, programming analogies, electronics programming",
  authors: [{ name: "EasyioLabs" }],
  openGraph: {
    title: "Arduino Programming Fundamentals - Learn Programming the Fun Way",
    description: "Master Arduino programming through fun analogies, interactive challenges, and hands-on projects. Perfect for absolute beginners.",
    type: "article",
    url: "https://easyiolabs.com/arduino-programming-fundamentals",
    images: [
      {
        url: "/images/arduino-programming-fundamentals-og.jpg",
        width: 1200,
        height: 630,
        alt: "Arduino Programming Fundamentals Course"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Arduino Programming Fundamentals - Learn Programming the Fun Way",
    description: "Master Arduino programming through fun analogies, interactive challenges, and hands-on projects. Perfect for absolute beginners.",
    images: ["/images/arduino-programming-fundamentals-og.jpg"]
  },
  alternates: {
    canonical: "https://easyiolabs.com/arduino-programming-fundamentals"
  }
};

export default function ArduinoProgrammingFundamentalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
