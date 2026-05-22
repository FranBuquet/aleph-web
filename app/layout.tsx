import type { Metadata } from "next";
import "./globals.css";
import { MotionProvider } from "@/components/MotionProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

export const metadata: Metadata = {
  title: "Aleph — Tu coach de fitness en WhatsApp",
  description: "Coach de fitness con IA por WhatsApp. Nutrición, rutinas, integración con Apple Watch y Strava. Sin app que descargar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full">
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
