// app/layout.tsx

// Import your fonts here
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { AuthProvider } from "@/components/AuthProvide"; // Adjust path if needed
import "./globals.css";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"] 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: "--font-dm-sans" 
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      {/* Add your default app-wide body classes here */}
      <body className="min-h-full flex flex-col font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}