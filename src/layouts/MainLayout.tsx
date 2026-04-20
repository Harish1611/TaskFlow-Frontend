import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { setSelectedTeam } from "../store/slices/teamSlice";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { setTheme } from "../utils/theme";
import { useEffect, useState } from "react";

export default function MainLayout({ children }: any) {
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { teams, selectedTeam } = useSelector((s: any) => s.team);

  // ✅ Theme State (IMPORTANT)
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = document.documentElement.classList.contains("dark");
    setIsDark(saved);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleTeamChange = (e: any) => {
    dispatch(setSelectedTeam(e.target.value));
  };

  // ✅ Toggle Theme (Reactive)
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    setTheme(next ? "dark" : "light");
  };

  const navItem = (to: string, label: string) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm font-medium transition
         ${
           isActive
             ? "bg-blue-500 text-white shadow"
             : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
         }`
      }
    >
      {label}
    </NavLink>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
      
      {/* Sidebar */}
      <aside className="w-60 border-r bg-white dark:bg-gray-800 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold mb-8 tracking-tight">
          🚀 TaskFlow
        </h2>

        <nav className="space-y-2">
          {navItem("/dashboard", "Dashboard")}
          {navItem("/projects", "Projects")}
          {navItem("/teams", "Teams")}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm dark:bg-gray-800 dark:border-gray-700">
          
          {/* Page Title */}
          <h1 className="text-lg font-semibold capitalize">
            {location.pathname.split("/")[1] || "dashboard"}
          </h1>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            
            {/* Team Switch */}
            {teams.length > 0 ? (
              <select
                value={selectedTeam || ""}
                onChange={handleTeamChange}
                className="px-3 py-1.5 text-sm border rounded-lg 
                           bg-white dark:bg-gray-700 dark:border-gray-600"
              >
                {teams.map((t: any) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="text-sm text-gray-500">
                No Teams
              </span>
            )}

            {/* 🌙 Interactive Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="relative w-14 h-7 rounded-full cursor-pointer transition-all duration-300
                         bg-gray-300 dark:bg-gray-600 flex items-center px-1"
            >
              {/* Icons */}
              <span className="absolute left-2 text-xs">☀️</span>
              <span className="absolute right-2 text-xs">🌙</span>

              {/* Slider */}
              <div
                className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ease-in-out
                  ${isDark ? "translate-x-7" : "translate-x-0"}
                `}
              />
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}