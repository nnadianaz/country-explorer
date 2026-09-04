import Dashboard from "./components/Dashboard";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { Route, Routes } from "react-router-dom";
import CreateTravelPlanPage from "./pages/CreateTravelPlanPage";

function App() {
  return (
    <>
      <ResponsiveAppBar />

      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/plans/new"
          element={<CreateTravelPlanPage />}
        />
</Routes>
    </>
  );
}

export default App;
