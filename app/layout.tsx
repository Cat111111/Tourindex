import "./globals.css";
export const metadata = { title: "Tourindex", description: "Δείκτες βιώσιμου τουρισμού" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="el"><body>{children}</body></html>);
}
