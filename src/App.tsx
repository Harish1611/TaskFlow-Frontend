import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTeams } from "./store/slices/teamSlice";
import AppRoutes from "./routes";
import { loadTheme } from "./utils/theme";

function App() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchTeams());
    loadTheme(); 
  }, []);

  return <AppRoutes />;
}

export default App;