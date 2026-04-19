import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function MainLayout({ children }: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 200 }}>Sidebar</aside>

      <main style={{ flex: 1 }}>
        <header>
          Navbar
          <button onClick={handleLogout}>Logout</button>
        </header>

        <div>{children}</div>
      </main>
    </div>
  );
}