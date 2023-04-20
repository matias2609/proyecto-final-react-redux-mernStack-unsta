import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";
import Signup from "./features/auth/Signup";
import RequireAuthTwo from "./features/auth/RequireAuthTwo";
import OlvideMiContraseña from "./components/OlvideMiContraseña";
import WorkWithUs from "./components/WorkWithUs";

function App() {
  useTitle("Datazo.com");

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="workWithUs" element={<WorkWithUs />} />
        <Route path="/login/missPassword" element={<OlvideMiContraseña />} />
        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route
              path="dash"
              element={
                <RequireAuthTwo>
                  <DashLayout />
                </RequireAuthTwo>
              }
            >
              <Route index element={<Welcome />} />
            </Route>
            {/* End Dash */}
          </Route>
        </Route>
        {/* End Protected Routes */}
      </Route>
    </Routes>
  );
}

export default App;
