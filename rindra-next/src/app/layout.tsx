import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RindraPortoV2.0 | Design & Developer",
  description:
    "Portfolio Rindra Bagus Haryo Putranto — Creative Beginner Problem Solver. Desain & pengembangan digital.",
  keywords: [
    "Rindra",
    "Portfolio",
    "Web Developer",
    "Designer",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Rindra Bagus Haryo Putranto" }],
  icons: { icon: "/rndr-logo.png" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
