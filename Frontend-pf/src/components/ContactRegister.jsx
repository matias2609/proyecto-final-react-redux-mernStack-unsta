import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTitle from "../hooks/useTitle";
import api from "../app/api/api";

const ContactRegister = () => {
  useTitle("Registrar Trabajo");
  const { id, token } = useParams();
  const [tokenContact, setTokenContact] = useState();
  const [fecha, setFecha] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const { email, nombre, apellido } = useAuth();

  useEffect(() => {
    api
      .post(`/professionals/contactHimGet/${id}`, {
        email,
        token,
      })
      .then((res) => {
        setTokenContact(res.data);
      });
  }, [id, email, token]);

  const handleFechaChange = (event) => {
    setFecha(event.target.value);
  };

  const handleDescripcionChange = (event) => {
    setDescripcion(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    api
      .post(`/professionals/commentAndRatingMail/${id}`, {
        nombreCliente: nombre,
        apellidoCliente: apellido,
        fechaTrabajo: fecha,
        descripcionTrabajo: descripcion,
        emailCliente: email,
      })
      .then((response) => {
        console.log(response.data);
      });
    setFecha("");
    setDescripcion("");
  };

  const isTokenValid =
    tokenContact && token.toLowerCase() === tokenContact.toLowerCase();

  if (!isTokenValid) {
    return (
      <>
        <div
          style={{ marginBottom: "800px", marginLeft: "20px" }}
          className="text-danger"
        >
          Acceso inválido. Puede que haya habido un error o se haya colocado una
          dirección URL diferente a la esperada. <a href="/">Volver</a>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ marginBottom: "600px", marginLeft: "20px" }}>
        <h2>Formulario de Registro del Trabajo</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Fecha:</label>
            <input type="date" value={fecha} onChange={handleFechaChange} />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea value={descripcion} onChange={handleDescripcionChange} />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};

export default ContactRegister;
