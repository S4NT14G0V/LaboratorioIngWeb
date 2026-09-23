import type { Metadata } from "next";
import { Geist, Geist_Mono, Iceland } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const iceland = Iceland({
  variable: "--font-iceland",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Santiago Trespalacios Bolivar",
  description: "Portfolio de Santiago Trespalacios Bolivar",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${iceland.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full overflow-x-hidden antialiased">
        <link
          rel="preload"
          as="image"
          href="/favicon.ico"
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration = 'manual';",
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if (localStorage.getItem("theme") === "light") document.documentElement.classList.remove("dark");',
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
