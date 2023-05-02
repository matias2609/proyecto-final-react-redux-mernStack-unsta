import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";
import React from "react";

const Welcome = () => {
  const { nombre, apellido, email, numeroContacto } = useAuth();

  useTitle(`Bienvenido: ${nombre}!`);

  const content = (
    <>
      <br />
      <br />
      <section className="welcome p-3">
        <h1>
          Bienvenido {apellido}, {nombre}, a DATAZO.COM!
        </h1>
        <h4> {email}</h4>
        <h4>{numeroContacto}</h4>
      </section>
    </>
  );

  return content;
};
export default Welcome;
