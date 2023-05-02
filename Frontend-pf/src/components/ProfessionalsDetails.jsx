import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";

const ProfessionalDetails = () => {
  const [professional, setProfessional] = useState({});
  const { id } = useParams();
  useTitle("Detalles del Profesional");

  const commentsContainer = useRef(null);

  useEffect(() => {
    axios.get(`http://localhost:3500/professionals/${id}`).then((response) => {
      console.log(response.data);
      setProfessional(response.data);
    });
  }, [id]);

  useEffect(() => {
    function updateCommentsHeight() {
      const windowHeight = window.innerHeight;
      const containerTop =
        commentsContainer.current.getBoundingClientRect().top;
      const containerHeight = windowHeight - containerTop - 100;

      commentsContainer.current.style.height = `${containerHeight}px`;
    }

    updateCommentsHeight();
    window.addEventListener("resize", updateCommentsHeight);

    return () => {
      window.removeEventListener("resize", updateCommentsHeight);
    };
  }, []);

  function renderStars(numStars) {
    const fullStars = Math.floor(numStars);
    const halfStars = Math.round(numStars - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon icon={faStar} key={`star-${i}`} />);
    }

    if (halfStars > 0) {
      stars.push(<FontAwesomeIcon icon={faStarHalfAlt} key="star-half" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          key={`star-empty-${i}`}
          className="text-muted"
        />
      );
    }

    return stars;
  }

  const rating = Math.round(professional.calificacion * 2) / 2;

  const contactar = () => {
    alert("Funcionalidad para otro sprint");
  };

  return (
    <>
      <div className="row mt-0 position-relative" style={{ height: "60%" }}>
        <div className="col-md-6 offset-md-3">
          <div
            className="card card-body d-flex flex-column align-items-center border-0"
            style={{ height: "100%" }}
          >
            <img
              src={professional.foto}
              className="img-thumbnail mt-2 rounded-circle"
              alt="Foto Perfil"
              style={{
                width: "150px",
                height: "150px",
                justifyContent: "center",
              }}
            />

            <div className="card-body">
              <h2 className="card-title" style={{ fontFamily: "Lexend" }}>
                {professional.nombre} {professional.apellido} -{" "}
                {professional.profesion}
              </h2>
              <hr />
              <h6 className="card-text">
                <strong>Calificación:</strong> {renderStars(rating)}
              </h6>
              <h6 className="card-text">
                <strong>Disponible:</strong> {professional.disponible}
              </h6>
              <h6 className="card-text">
                <strong>Telefono:</strong> {professional.contacto}
              </h6>
              <h6 className="card-text">
                <strong>Correo:</strong> {professional.email}
              </h6>
              <div className="container d-flex justify-content-end">
                <button
                  onClick={contactar}
                  style={{
                    fontFamily: "Lexend",
                    color: "#ffff",
                    backgroundColor: "#FA7C1F",
                  }}
                  className="btn btn-lg"
                >
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {professional.comentarios && (
        <h5 className="col-md-6 offset-md-3">
          Todos los comentarios:{" "}
          {professional.comentarios.length > 0
            ? `(${professional.comentarios.length})`
            : ""}
        </h5>
      )}
      <div className="row mt-2 comments-container p-2" ref={commentsContainer}>
        <div className="col-md-6 offset-md-3">
          {professional.comentarios &&
            professional.comentarios.map((comentario) => (
              <>
                <div
                  className="card mt-3 position-relative border-0"
                  key={comentario._id}
                  style={{ marginRight: "30px", marginBottom: "40px" }}
                >
                  <div className="card-body d-flex">
                    <div className="mr-3">
                      <img
                        src={comentario.fotoPersona}
                        alt="fotoPersona"
                        style={{
                          maxWidth: "60px",
                          height: "50px",
                        }}
                        className="img-thumbnail rounded-circle"
                      />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                      <h5 className="card-title mb-1">
                        {comentario.nombrePersona} - {comentario.titulo}
                      </h5>
                      <p>{comentario.descripcion}</p>
                      <p>
                        <strong>Calificación:</strong>{" "}
                        {renderStars(comentario.calificacionComentario)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProfessionalDetails;
