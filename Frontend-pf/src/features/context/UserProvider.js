import { createContext, useState, useEffect } from "react";
import { useSendLogoutMutation } from "../auth/authApiSlice";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser !== null ? JSON.parse(storedUser) : false;
  });

  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const signIn = () => {
    setUser(true);
  };

  const signOut = () => {
    setUser(false);
    sendLogout();
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
