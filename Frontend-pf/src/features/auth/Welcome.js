import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
  const { nombre, apellido, email, numeroContacto } = useAuth();

  useTitle(`Bienvenido: ${nombre}!`);

  const content = (
    <section className="welcome p-3">
      <h1>
        Bienvenido {apellido}, {nombre}, soy el componente Welcome en Features!
      </h1>
      <p>{email}</p>
      <p>{numeroContacto}</p>
    </section>
  );

  return content;
};
export default Welcome;
