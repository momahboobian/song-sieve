import DynamicBackground from "./components/Background/Background";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Song Sieve",
  description:
    "A application developed to enhance the music-sharing experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <html lang="en">
      <body>
        <DynamicBackground />
        {children}
      </body>
    </html>
  );
}
