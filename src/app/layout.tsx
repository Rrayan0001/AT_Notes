import type { Metadata } from "next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import { WelcomeGate } from "@/components/welcome";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
// Serif is reserved for transcribed notebook text, so provenance is visible at
// a glance: the assistant writes in Geist, the notes are set in Newsreader.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Automation Tools Notes",
  description:
    "Two hundred seventy-five pages of handwritten ink, transcribed word for word — ask, and the exact page answers.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} h-full antialiased`}
    >
      <head>
        {/*
          Applies the theme before first paint to avoid a flash. Default is the
          device theme; an explicitly toggled theme wins until OS theme changes
          are mirrored live while no override is stored.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem("pavan-notes-theme");var m=window.matchMedia("(prefers-color-scheme: dark)");var root=document.documentElement;var d=s?s==="dark":m.matches;root.classList.toggle("dark",d);root.style.colorScheme=d?"dark":"light";var follow=function(e){try{if(localStorage.getItem("pavan-notes-theme"))return;root.classList.toggle("dark",e.matches);root.style.colorScheme=e.matches?"dark":"light";}catch(_){}};if(m.addEventListener)m.addEventListener("change",follow);else if(m.addListener)m.addListener(follow);}catch(e){}})();`,
          }}
        />
        {/* Hides the page behind a static veil until the welcome sequence runs, so the landing page never flashes before it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduced||sessionStorage.getItem("axiom-welcome")==="1")return;document.documentElement.classList.add("axiom-welcome-pending");}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col grain">
        <div data-welcome-static aria-hidden="true" className="welcome-static" />
        <WelcomeGate />
        {children}
      </body>
    </html>
  );
}