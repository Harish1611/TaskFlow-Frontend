export default function MainLayout({ children }: any) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200 }}>Sidebar</aside>

      <main style={{ flex: 1 }}>
        <header>Navbar</header>
        <div>{children}</div>
      </main>
    </div>
  );
}