import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pritam Priyabrata Palai — Software Engineer",
  description: "Portfolio of Pritam Priyabrata Palai — AI, backend systems, distributed systems and full-stack engineering.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
