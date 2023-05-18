import React from "react";
import { UserContext } from "../features/context/UserProvider";
import useTitle from "../hooks/useTitle";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import toast, { Toaster } from "react-hot-toast";

const Public = () => {
  useTitle("Datazo.com");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const alertLogged = (e) => {
    e.preventDefault();
    if (user === false) {
      return toast((t) => (
        <span>
          Regístrate o inicia sesión para acceder al catálogo de profesionales
          de oficio y disfrutar de nuestra plataforma.{" "}
          <a href="/signup">¡Regístrate ahora en pocos minutos!</a>
        </span>
      )).then(navigate("/"));
    }
  };

  const content = (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <section className="head mt-3">
        <div
          style={{ position: "relative", maxWidth: "100%", overflow: "hidden" }}
        >
          <img
            src="https://i.ibb.co/wgQrR7T/Head.jpg"
            style={{ width: "100%", height: "auto" }}
            alt="datazoForYou"
          />
          <p
            className="image-text"
            style={{
              position: "absolute",
              top: "4.2vw",
              left: "3.5vw",
              margin: "0px",
              color: "#fff",
              fontSize: "3.5vw",
              fontWeight: "bold",
            }}
          >
            ¿Estás buscando un profesional<br></br>
            de confianza para tu hogar?<br></br>
          </p>
          <p
            style={{
              position: "absolute",
              top: "15.0vw",
              left: "3.5vw",
              margin: "0px",
              color: "#fff",
              fontSize: "2.5vw",
              fontWeight: "bold",
            }}
          >
            ¡Tenemos un Datazo para vos!
          </p>
        </div>
      </section>
      <br></br>

      <section>
        <div
          className="card-container mt-3 "
          style={{
            marginRight: "2.0vw",
            paddingLeft: "3.5vw",
          }}
        >
          <a className="mr-2">
            <img src="https://i.ibb.co/GFN3gVM/Card1.jpg" />
          </a>
          <a>
            <img src="https://i.ibb.co/LYvtNRT/Arrow.jpg" />
          </a>
          <a>
            <img src="https://i.ibb.co/qMYtSbT/Card2.jpg" />
          </a>
          <a>
            <img src="https://i.ibb.co/LYvtNRT/Arrow.jpg" />
          </a>
          <a>
            <img src="https://i.ibb.co/XyT16Sf/Card3.jpg" />
          </a>
        </div>
      </section>
      <br></br>

      <section
        className="text-center"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        <button
          className="btn-ver-categorias"
          style={{
            backgroundColor: "white",
            color: "#F47024",
            border: "3px solid #F47024",
            borderRadius: "25px",
            padding: "10px 20px",
            fontSize: "1.1em",
            height: "auto",
            width: "auto",
          }}
        >
          <a
            href="#categories"
            style={{
              textDecoration: "none",
              color: "#F25C05",
              fontFamily: "Inter",
              fontWeight: "600",
            }}
          >
            Ver Categorías
          </a>
        </button>
        <br />

        <svg
          width="31"
          height="31"
          viewBox="0 0 31 31"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <rect
            x="31"
            y="31"
            width="31"
            height="31"
            transform="rotate(-180 31 31)"
            fill="url(#pattern0)"
          />
          <defs>
            <pattern
              id="pattern0"
              patternContentUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <use xlinkHref="#image0_1186_163" transform="scale(0.0111111)" />
            </pattern>
            <image
              id="image0_1186_163"
              width="90"
              height="90"
              xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACBklEQVR4nO2ZPU4DMRCFDQVQcBIuYHdpuRUtVARB6Ul6SgrEiUCU6whRDjIQCQpQArHnx++T0kSrzXufNrv2TggAAAAAAAAAAAAAAAAALMBXp4dTjhdTTk8TpceJ0nn9TjqXK/j25KBQvCuU+Nsnxwdezo6k8/mWTJDdTzJBdj/JBNn9JBNk95NMkL0xdblWcrr/XWS63+QYLP3+cyV/Lue2Ofan3xsS/oM4yO4geQ1kbwjv4BYA2R0kr4HsjmIYD8h+QiC7o4jhZXPHv/awslmg+HCyJQvzKLI1FGUFGZqiqSAryiLyFo63GK7+dzjbItM4m5E86KZGZMeXB5Mttq2mgWSLSqZBZKuQTM5lq5JMTmW3WsIVgeGs2qWf9PtkHuF9tuSVzF/OqSVHMwrFay3lWEo2pXloCZ+F/ULpRYNkWdlxxRz2QkvRU46vWiRLya4OqovQkkJpqUmyyDlzWoTWPN/Mjqvsjys7rkqOl9JCmsumNK9d3zvntKgOQi/+co/iDk/1Vr9R+za9L+8KxnDWl2S1G5DWYDjbAQ1XFSvI0BRNBVlRFvfFWGEmt4VYcTZ3RdhARjcF2FBW88HZWmZzgS1mNxPUcgf1AT10URvMUydVA0zP3XY9nNWGy+GsVlwNZ7XjYjhrBdPDWWuYHM5axsxwFgAAAAAAAAAAAAAAAAAAoTlvbtjmnO7m71MAAAAASUVORK5CYII="
            />
          </defs>
        </svg>
      </section>

      <section
        id="categories"
        style={{
          width: "100%",
          height: "auto",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "auto",
            height: "auto",
          }}
        >
          <div className="parrafo">
            <h3 style={{ color: "#003169" }}>
              ¡Buscá según la categoría que necesitás!
            </h3>
          </div>

          <div className="categories-container" onClick={alertLogged}>
            <Link to={`/dash/professionals/Plomero`}>
              <a href="#plomeros">
                <img
                  src="https://i.ibb.co/LzGk2nC/Plomeros.png"
                  alt="Plomeros"
                />
              </a>
            </Link>
            <Link to={`/dash/professionals/Gasista`}>
              {" "}
              <a href="#gasistas">
                <img
                  src="https://i.ibb.co/zS3KzQ3/Gasistas.png"
                  alt="Gasistas"
                />
              </a>
            </Link>
            <Link to={`/dash/professionals/Pintor`}>
              <a href="#pintores">
                <img
                  src="https://i.ibb.co/5kP23P9/Pintores.png"
                  alt="Pintores"
                />
              </a>
            </Link>
          </div>
          <div className="categories-container" onClick={alertLogged}>
            <Link to={`/dash/professionals/Carpintero`}>
              {" "}
              <a href="#carpinteros">
                <img
                  src="https://i.ibb.co/3SB9f4p/Carpinteros.png"
                  alt="Carpinteros"
                />
              </a>
            </Link>
            <Link to={`/dash/professionals/Electricista`}>
              {" "}
              <a href="#electricistas">
                <img
                  src="https://i.ibb.co/rM6Qr0X/Electricistas.png"
                  alt="Electricistas"
                />
              </a>
            </Link>
            <Link to={`/dash/professionals/Albañil`}>
              <a href="#albaniles">
                <img
                  src="https://i.ibb.co/jWxsHQ4/Alba-iles.png"
                  alt="Alba-iles"
                />
              </a>
            </Link>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
    </>
  );
  return content;
};
export default Public;
