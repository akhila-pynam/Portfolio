import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Akhila Pynam — Software Developer & Builder",
  description:
    "Akhila Pynam — Computer Science student, software developer, problem solver, and builder of AI-powered and interactive applications.",
  keywords: [
    "Akhila Pynam",
    "software developer",
    "computer science",
    "portfolio",
    "AI",
    "web development",
  ],
  authors: [{ name: "Akhila Pynam" }],
  openGraph: {
    type: "website",
    title: "Akhila Pynam — Software Developer & Builder",
    description:
      "Computer Science student, problem solver, and builder exploring software engineering, AI, and interactive experiences.",
    siteName: "Akhila Pynam Portfolio",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Akhila Pynam — Software Developer & Builder",
    description:
      "Computer Science student, problem solver, and builder exploring software engineering, AI, and interactive experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-midnight text-soft-white font-inter antialiased">
        {children}
      </body>
    </html>
  );
}
