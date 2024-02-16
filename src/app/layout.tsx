import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issem: Career-Mentor",
  description:
    "Issem provides career support services to people." +
    "Issem answers questions about various jobs and positions, such as skills, qualifications, salaries, and benefits." +
    "Currently, Issem is in beta mode and only answer questions for a select few positions to begin with." +
    "In future, Issem capabilities will be expanded with larger knowledge base and services. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
