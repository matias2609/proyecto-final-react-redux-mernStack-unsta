import React from "react";
import useTitle from "../hooks/useTitle";
import { useState } from "react";
import {
  passwordRecoveryMail,
  verifyVerificationCode,
} from "./OlvideContraseña";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const OlvideMiContraseña = () => {
  useTitle("Olvide mi contraseña");

  const [showEmailForm, setShowEmailForm] = useState(true);
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handlePasswordRecoveryMail = async (e) => {
    setShowEmailForm(false);
    setShowCodeForm(true);
    e.preventDefault();
    try {
      await passwordRecoveryMail(email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVerifyVerificationCode = async (e) => {
    e.preventDefault();
    try {
      await verifyVerificationCode(email, verificationCode, newPassword);

      Swal.fire({
        icon: "success",
        text: "Hemos enviado un mail al correo proporcionado, revisar por favor",
      });
      setTimeout(navigate("/login"), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card p-4 col-5 position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center">
      {showEmailForm && (
        <>
          <h2 className="text-center mb-4" for="email">
            Recuperar contraseña
          </h2>
          <form onSubmit={handlePasswordRecoveryMail}>
            <div className="form-group">
              <label for="email" className="mb-2">
                Necesitamos que nos proporcione de su email para la recuperacion
                de contraseña
              </label>
              <br />
              <input
                type="email"
                className="form-control "
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ingrese su email"
                autoComplete="off"
                required
              />
            </div>
            <br />
            <button type="submit" className="btn btn-primary ">
              Recuperar contraseña
            </button>
          </form>
        </>
      )}
      {showCodeForm && (
        <>
          <div className="">
            <h4>
              Ingresa el Código de Verificación que te hemos enviado a tu email,
              luego ingresa una nueva contraseña para reestablecerla.
            </h4>
            <form
              onSubmit={handleVerifyVerificationCode}
              className="col-6  justify-content-center align-items-center"
            >
              <br />
              <div className="mb-3">
                <label htmlFor="code" className="form-label">
                  Código:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  id="code"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="code" className="form-label">
                  Nueva Contraseña:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="code"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  autoComplete="off"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Verificar Código
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default OlvideMiContraseña;
