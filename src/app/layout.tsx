import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "wow-planner",
	description: "wow planner",
	icons: {
		icon: "/logos/world-of-warcraft.svg",
	},
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
