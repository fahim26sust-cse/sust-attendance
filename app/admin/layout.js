import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* <header style={{ background: '#333', color: '#fff', padding: '10px' }}>
          <h1>Admin Dashboard</h1>
        </header> */}
        <div >
          {children}
        </div>
      </body>
    </html>
  );
}
