import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { RoleProvider } from "@/contexts/RoleContext";
import { PreviewProvider } from "@/contexts/PreviewContext";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "PartPulse - Spare Parts Distribution Management",
  description: "Internal spare parts distribution management system for Trane Thermo King",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <RoleProvider>
            <PreviewProvider>
              <div className="flex flex-col h-screen">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                  <Sidebar />
                  <main className="flex-1 overflow-y-auto bg-gray-50">
                    {children}
                  </main>
                </div>
              </div>
            </PreviewProvider>
          </RoleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
