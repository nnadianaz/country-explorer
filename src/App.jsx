import Dashboard from "./components/Dashboard";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Route, Routes } from "react-router-dom";
import CreateTravelPlanPage from "./pages/CreateTravelPlanPage";
import FavoritesPage from "./pages/FavoritesPage";

function App() {
  return (
    <>
      <ResponsiveAppBar />

      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/plans/new" element={<CreateTravelPlanPage />} />

        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default App;
