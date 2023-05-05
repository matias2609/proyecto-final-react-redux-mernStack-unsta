import Swal from "sweetalert2";
import React from "react";
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
      <section className="head">
        <div style={{ maxWidth: "100%", overflow: "hidden" }}>
          <img
            src="https://i.ibb.co/dM8z8yy/Head.png"
            style={{ width: "100%", height: "auto" }}
            alt=""
          />
        </div>
      </section>
      <br></br>

      <section>
        <div
          className="card-container text-center"
          style={{ padding: "0 20px" }}
        >
          <img src="https://i.ibb.co/kSn8Z6B/Card.png" alt="" />
        </div>
      </section>

      <section
        className="text-center"
        style={{ textAlign: "center", marginTop: "60px" }}
      >
        <a
          href="#categories"
          className="btn btn-lg active"
          role="button"
          aria-pressed="true"
          style={{ fontSize: "20px", padding: "10px 20px", color: "#f27405" }}
        >
          Ver Categorías ▼
        </a>
      </section>
      <section
        id="categories"
        style={{
          width: "100%",
          height: "auto",
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

          <div id="categorias" className="text-center">
            <div className="row justify-content-center categorias-div">
              <div className="col-2">
                <Link to={`/dash/professionals/Plomero`}>
                  <a href="#plomeros" className="botoncategorias">
                    <img
                      src="https://i.ibb.co/LzGk2nC/Plomeros.png"
                      alt="Plomero"
                    ></img>
                  </a>
                </Link>
              </div>
              <div className="col-2">
                <Link to={`/dash/professionals/Gasista`}>
                  <a href="#gasistas" className="botoncategorias">
                    <img
                      src="https://i.ibb.co/zS3KzQ3/Gasistas.png"
                      alt="Gasista"
                    ></img>
                  </a>
                </Link>
              </div>
              <div className="col-2">
                <Link to={`/dash/professionals/Pintor`}>
                  <a href="#pintores" className="botoncategorias">
                    <img
                      src="https://i.ibb.co/5kP23P9/Pintores.png"
                      alt="Pintor"
                    ></img>
                  </a>
                </Link>
              </div>
            </div>
            <div className="row justify-content-center mt-3 categorias-div">
              <div className="col-2">
                <Link to={`/dash/professionals/Carpintero`}>
                  <a href="#carpinteros" className="botoncategorias">
                    <img
                      src="https://i.ibb.co/3SB9f4p/Carpinteros.png"
                      alt="Carpintero"
                    ></img>
                  </a>
                </Link>
              </div>
              <div className="col-2">
                <Link to={`/dash/professionals/Electricista`}>
                  <a href="#electricistas" className="botoncategorias">
                    <img
                      src="https://i.ibb.co/rM6Qr0X/Electricistas.png"
                      alt="Electricista"
                    ></img>
                  </a>
                </Link>
              </div>
              <div className="col-2">
                <Link to={`/dash/professionals/Albañil`}>
                  <a href="#albaniles" className="botoncategorias">
                    <img
                      src="https://i.ibb.co/jWxsHQ4/Alba-iles.png"
                      alt="Albañil"
                    ></img>
                  </a>
                </Link>
              </div>
            </div>
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
