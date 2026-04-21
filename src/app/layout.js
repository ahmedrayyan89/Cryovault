import { Space_Grotesk, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "CryoVault — Custom Water-Cooled PC | Cooled to Perfection",
  description:
    "CryoVault is a custom water-cooled PC build engineered for silence, performance, and obsessive detail. Precision hardline tubing, dual radiators, and flagship silicon — built for legends.",
  keywords: [
    "custom PC",
    "water cooling",
    "custom loop",
    "gaming PC",
    "hardline tubing",
    "CryoVault",
    "premium PC build",
  ],
  openGraph: {
    title: "CryoVault — Custom Water-Cooled PC",
    description:
      "Engineered for obsessives, built for legends. A custom water-cooled PC build with precision hardline tubing and flagship silicon.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#1a1a1e",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlex.variable}`}>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlex.variable} antialiased selection:bg-white/20`}
      >
        {children}
      </body>
    </html>
  );
}
