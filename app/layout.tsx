import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Backend API - Undangan Wisuda',
  description: 'Backend API for graduation invitation management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
