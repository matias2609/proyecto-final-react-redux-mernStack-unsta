import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);
    const { email, roles, nombre, apellido, numeroContacto } = decoded.UserInfo;

    return {
      email,
      roles,
      nombre,
      apellido,
      numeroContacto,
    };
  }

  return {
    email: "",
    roles: [],
    nombre: "",
    apellido: "",
    numeroContacto: "",
  };
};
export default useAuth;
