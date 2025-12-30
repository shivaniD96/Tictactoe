import { Inter } from "next/font/google";
import "./globals.css";
import { OnchainProviders } from "@/components/OnchainProviders";
import '@coinbase/onchainkit/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Base Tic-Tac-Toe",
  description: "A Tic-Tac-Toe game on Base",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
