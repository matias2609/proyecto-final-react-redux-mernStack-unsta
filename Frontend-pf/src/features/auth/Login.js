import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { UserContext } from "../context/UserProvider";

const Login = () => {
  useTitle("Iniciar Sesion");
  const { signIn } = useContext(UserContext);
  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist("persists");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");
      signIn(true); //from userProvider of UserContext
      setPersist(true);
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const errClass = errMsg ? "errmsg" : "offscreen";

  if (isLoading) return <PulseLoader color={"#FFF"} />;

  const content = (
    <>
      <main>
        <div className="content">
          <div className="row">
            <div className="col-md-4 mx-auto">
              <div className="card mt-4 text-center">
                <div className="card-header">
                  <h1>Log In</h1>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group mb-4">
                      <p
                        ref={errRef}
                        className={errClass}
                        aria-live="assertive"
                      >
                        {errMsg}
                      </p>
                      <label
                        htmlFor="email"
                        className="d-flex justify-content-start"
                      ></label>
                      <input
                        type="email"
                        placeholder="Ingrese su email"
                        className="form-control"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleUserInput}
                        ref={userRef}
                        autoComplete="off"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label
                        htmlFor="password"
                        className="d-flex justify-content-start"
                      ></label>
                      <input
                        type="password"
                        placeholder="Ingrese su contraseña"
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePwdInput}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <br />
                      <button
                        type="submit"
                        className="btn btn-primary btn-block text-center"
                      >
                        Iniciar Sesión
                      </button>
                      <label
                        hidden
                        htmlFor="persist"
                        className="form__persist ms-2"
                      >
                        <input
                          type="checkbox"
                          className="form__checkbox"
                          id="persist"
                          onChange={handleToggle}
                          checked={persist}
                          defaultChecked={true}
                        />
                        &nbsp;Mantener sesion iniciada
                      </label>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );

  return content;
};
export default Login;
