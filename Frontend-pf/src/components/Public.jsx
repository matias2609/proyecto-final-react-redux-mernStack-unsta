import Swal from "sweetalert2";
import { UserContext } from "../features/context/UserProvider";
import useTitle from "../hooks/useTitle";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

const Public = () => {
  useTitle("Datazo.com");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const alertLogged = (e) => {
    e.preventDefault();
    if (user === false) {
      Swal.fire({
        icon: "error",
        text: "Debe haber iniciado sesión para ver a los profesionales disponibles",
      });
      navigate("/");
    }
  };

  const content = (
    <>
      <img
        src="https://i.ibb.co/gSZTq5v/Head.png"
        alt="Presentacion"
        className="presentation d-flex justify-content-center"
        style={{ width: "1905px", height: "410px" }}
      />

      <div className="moreinfo1">
        <a href="#categories" className="btn btn-primary btn-lg">
          Ver Categorías ⤓
        </a>
      </div>
      <section id="categories">
        <div className="parrafo">
          <h2>¡Buscá según la categoría que necesitás!</h2>
        </div>
        <div className="categorias1" onClick={alertLogged}>
          <Link to={`/dash/professionals/Plomero`}>
            <a href="#plomeros" className="botoncategorias">
              <img
                src="https://i.ibb.co/LzGk2nC/Plomeros.png"
                alt="Plomero"
              ></img>
            </a>
          </Link>
          <Link to={`/dash/professionals/Gasista`}>
            <a href="#gasistas" className="botoncategorias">
              <img
                src="https://i.ibb.co/zS3KzQ3/Gasistas.png"
                alt="Gasista"
              ></img>
            </a>
          </Link>
          <Link to={`/dash/professionals/Pintor`}>
            <a href="#pintores" className="botoncategorias">
              <img
                src="https://i.ibb.co/5kP23P9/Pintores.png"
                alt="Pintor"
              ></img>
            </a>
          </Link>
        </div>
        <div className="categorias2" onClick={alertLogged}>
          <Link to={`/dash/professionals/Carpintero`}>
            <a href="#carpinteros" className="botoncategorias">
              <img
                src="https://i.ibb.co/3SB9f4p/Carpinteros.png"
                alt="Carpintero"
              ></img>
            </a>
          </Link>
          <Link to={`/dash/professionals/Electricista`}>
            <a href="#electricistas" className="botoncategorias">
              <img
                src="https://i.ibb.co/rM6Qr0X/Electricistas.png"
                alt="Electricista"
              ></img>
            </a>
          </Link>
          <Link to={`/dash/professionals/Albañil`}>
            <a href="#albaniles" className="botoncategorias">
              <img
                src="https://i.ibb.co/jWxsHQ4/Alba-iles.png"
                alt="Albañil"
              ></img>
            </a>
          </Link>
        </div>
      </section>
      <br />
      <br />
      <div className="moreinfo2" id="about">
        <a className="btn btn-primary btn-lg" href="#about">
          Acerca de nosotros ⤓
        </a>
      </div>
      <br />
      <br />
      <div className="img-container2">
        <img src="https://i.ibb.co/XDmXrt1/About.png" alt="About" border="0" />
      </div>
      <br />
      <br />
      <br />
      <div className="moreinfo2" id="faqs">
        <a className="btn btn-primary btn-lg" href="#faqs">
          FAQs ⤓
        </a>
      </div>
      <div className="img-container2" id="faqs">
        <img src="https://i.ibb.co/GWtMKcT/FAQs.png" alt="FAQs" border="0" />
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
  return content;
};
export default Public;
