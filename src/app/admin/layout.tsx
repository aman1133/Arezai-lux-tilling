export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout wraps ALL /admin pages.
  return <>{children}</>;
}
