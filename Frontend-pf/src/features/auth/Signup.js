import { useState } from "react";
import useTitle from "../../hooks/useTitle";
import axios from "axios";
import Swal from "sweetalert2";

export const Signup = () => {
  useTitle("Registro de Usuario");
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numeroContacto: "",
    email: "",
    password: "",
  });

  const [validationError, setValidationError] = useState("");

  const validateForm = () => {
    const formValues = Object.values(formData);
    for (let i = 0; i < formValues.length; i++) {
      if (formValues[i].trim() === "") {
        setValidationError("Por favor complete todos los campos");
        return false;
      }
    }
    if (formData.password !== formData.repassword) {
      setValidationError(
        "Las contraseñas no coinciden, vuelva a ingresarlas correctamente"
      );
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3500/auth/register",
        formData
      );
      console.log(response.data);

      setFormData({
        nombre: "",
        apellido: "",
        numeroContacto: "",
        email: "",
        password: "",
        repassword: "",
      });
      Swal.fire({
        icon: "success",
        title:
          "Hemos enviado un mail al correo proporcionado, revisar por favor",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {validationError && (
        <div class="alert alert-danger" role="alert">
          {validationError}
        </div>
      )}
      <div class="content">
        <div class="row">
          <div class="col-md-4 mx-auto">
            <div class="card">
              <div class="card-header">
                <h1>Sign Up</h1>
              </div>
              <div class="card-body">
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="nombre"
                      onChange={handleChange}
                      value={formData.nombre}
                      placeholder="Ingrese su nombre"
                      required
                    />
                  </div>
                  <br></br>
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="apellido"
                      onChange={handleChange}
                      value={formData.apellido}
                      placeholder="Ingrese su apellido"
                      required
                    />
                  </div>
                  <br></br>
                  <div class="form-group">
                    <input
                      type="number"
                      class="form-control"
                      name="numeroContacto"
                      onChange={handleChange}
                      value={formData.numeroContacto}
                      placeholder="Ingrese su número de contacto"
                      required
                    />
                  </div>
                  <br></br>
                  <div class="form-group">
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      placeholder="Ingrese su email"
                      required
                    />
                  </div>
                  <br></br>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      name="password"
                      onChange={handleChange}
                      value={formData.password}
                      placeholder="Ingrese su contraseña"
                      required
                    />
                  </div>
                  <br></br>
                  <div class="form-group">
                    <input
                      type="password"
                      class="form-control"
                      name="repassword"
                      onChange={handleChange}
                      value={formData.repassword}
                      placeholder="Ingrese nuevamente su contraseña"
                      required
                    />
                  </div>
                  <br></br>
                  <button type="submit" class="btn btn-primary btn-block">
                    Registrarse
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
