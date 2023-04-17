import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../features/context/UserProvider";

const Layout = () => {
  const { user, signOut } = useContext(UserContext);
  return (
    <>
      <header className="header position-absolute">
        <nav className="nav">
          <div className="button-container">
            <NavLink className="button" to="/">
              Home
            </NavLink>
            {user ? (
              <>
                <NavLink className="button btn btn-success" to="/dash">
                  Ruta protegida 🔑
                </NavLink>
                <button className="btn btn-danger" onClick={signOut}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <NavLink className="button" to="/signup">
                  Sign Up
                </NavLink>
                <NavLink className="button" to="/login">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Outlet />
      <footer className="footer text-center">
        <h5>Datazo.com.ar | UNSTA | 2023</h5>
      </footer>
    </>
  );
};
export default Layout;
