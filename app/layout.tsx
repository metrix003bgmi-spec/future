import './globals.css';
import { Inter, Arapey } from 'next/font/google';

const primaryFont = Inter({
  subsets: ['latin'],
  variable: '--font-primary', 
});

// Configure Arapey with separate weight and style
const headingFont = Arapey({
  subsets: ['latin'],
  weight: '400', 
  style: ['normal', 'italic'], 
  variable: '--font-heading',
});

export const metadata = {
  title: 'FurnWalk | Official Website | Premium Furniture',
  description: 'Premium Furniture Website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${primaryFont.variable} ${headingFont.variable}`}>
      <body className="font-sans antialiased bg-black m-0 p-0">
        {children}
      </body>
    </html>
  );
}