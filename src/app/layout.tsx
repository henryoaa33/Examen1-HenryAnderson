import { GastosProvider } from "./providers/GastosProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <GastosProvider>
          {children}
        </GastosProvider>
      </body>
    </html>
  );
}