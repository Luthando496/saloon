import { AuthProvider } from "@/components/AuthProvide";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
// import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "Luxé Salon",
  description: "Premium hair & beauty management",
};

// app/(auth)/login/layout.tsx

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    // Apply your specific login background/text colors to a standard div, not the body
    <div className="font-sans bg-[#0d0a1a] text-white antialiased min-h-screen">
      {children}
    </div>
  );
}