import './globals.css';
import { Open_Sans, Lato } from 'next/font/google';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans', // Creates a CSS variable
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato', // Creates a CSS variable
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
    // Apply the font variables to the root HTML
    <html lang="en" className={`${openSans.variable} ${lato.variable}`}>
      <body className="font-sans antialiased bg-black m-0 p-0">
        {children}
      </body>
    </html>
  );
}