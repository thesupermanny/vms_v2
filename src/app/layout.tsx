import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Auth from '@/components/auth/Auth';
import NavBar from '@/components/NavBar';
import { isAuthenticated } from '@/utils/amplify-utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VMS v2',
  description: 'Veterans Management System v2',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('RootLayout: Start'); // Log to confirm function call
  const authenticated = await isAuthenticated();
  console.log('RootLayout: Is authenticated:', authenticated); // Log authentication status

  return (
    <html lang='en'>
      <body className={inter.className}>
        <NavBar isSignedIn={authenticated} />
        <Auth>{children}</Auth>
      </body>
    </html>
  );
}

// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import Auth from '@/components/auth/Auth';
// import NavBar from '@/components/NavBar';
// import { isAuthenticated } from '../utils/amplify-utils';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'VMS v2',
//   description: 'Veterans Management System v2',
// };

// export default async function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const authenticated = await isAuthenticated();
//   console.log('Is authenticated:', authenticated); // Add this line to log the authentication status

//   return (
//     <html lang='en'>
//       <body className={inter.className}>
//         <NavBar isSignedIn={authenticated} />
//         <Auth>{children}</Auth>
//       </body>
//     </html>
//   );
// }
