import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Bebin R — Full Stack & ML Developer",
  description:
    "Bebin R — AI & Data Science Student | Full Stack Developer | Machine Learning Enthusiast based in Coimbatore, Tamil Nadu, India.",
  keywords: [
    "Full Stack Developer",
    "Machine Learning Intern",
    "AI & Data Science",
    "React",
    "Python",
    "Flutter",
    "MySQL",
    "Bebin R",
    "Coimbatore",
  ],
  authors: [{ name: "Bebin R" }],
  creator: "Bebin R",
  openGraph: {
    title: "Bebin R — Full Stack & ML Developer",
    description:
      "Bebin R — AI & Data Science Student | Full Stack Developer | Machine Learning Enthusiast.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bebin R — Full Stack & ML Developer",
    description:
      "AI & Data Science Student, ML Intern at Techvolt Software, Full Stack Developer.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
