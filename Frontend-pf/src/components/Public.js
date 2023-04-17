import useTitle from "../hooks/useTitle";

const Public = () => {
  useTitle("Datazo.com");
  const content = (
    <>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="button-work">
        <button>Trabaja con nosotros!</button>
      </div>
      <nav>
        <button>
          <a href="#inicio">Ver más</a>
        </button>
      </nav>

      <section id="inicio">
        <h5>
          Datazo es una plataforma que facilita la contratación de servicios
          para el hogar, como electricidad, plomería, albañilería y más.
          <br />
          Aquí puedes encontrar profesionales calificados y de confianza que se
          ajustan a tus necesidades y presupuesto.
          <br />
          También puedes ver las valoraciones y opiniones de otros clientes que
          han contratado sus servicios.
          <br />
          Datazo te ofrece una forma rápida, fácil y segura de resolver
          cualquier problema o proyecto que tengas en tu hogar,
          <br />
          sin tener que buscar entre cientos de opciones o arriesgarte a
          contratar a alguien desconocido.
          <br />
          Datazo es la solución ideal para tus necesidades.
        </h5>
      </section>
    </>
  );
  return content;
};
export default Public;
