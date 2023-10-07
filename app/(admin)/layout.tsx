export const metadata = {
  title: "Admin | Christos Uster Biswas",
  description: "Content Management System for this portfolio",
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
