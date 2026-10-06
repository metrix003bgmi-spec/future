import './globals.css';
// 1. Import your new fonts
import { Inter, Playfair_Display } from 'next/font/google';

// 2. Configure the primary text font
const primaryFont = Inter({
  subsets: ['latin'],
  variable: '--font-primary', 
});

// 3. Configure the heading font
const headingFont = Playfair_Display({
  subsets: ['latin'],
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
    // 4. Inject the new variables into the HTML tag
    <html lang="en" className={`${primaryFont.variable} ${headingFont.variable}`}>
      <body className="font-sans antialiased bg-black m-0 p-0">
        {children}
      </body>
    </html>
  );
}