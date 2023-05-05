import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";
import React from "react";

const Professionals = () => {
  const { alt } = useParams();
  const [professionals, setProfessionals] = useState([]);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);
  const [sortBy, setSortBy] = useState("todos");
  useTitle("Buscar Profesionales");

  //GET de profesionales cuando el componente se renderice
  useEffect(() => {
    const fetchProfessionals = async () => {
      const response = await axios.get("http://localhost:3500/professionals");
      setProfessionals(response.data.professional);
    };

    fetchProfessionals();
  }, []);

  //Filtro para hacer coincidir la ocupacion del profesional y el alt de la imagen
  useEffect(() => {
    const filtered = professionals.filter(
      (professional) => professional.profesion === alt
    );
    setFilteredProfessionals(filtered);
  }, [alt, professionals]);

  //Función para ordenar la lista de profesionales según la opción seleccionada en el dropdown
  const sortProfessionals = (sortOption) => {
    setSortBy(sortOption);
    let sortedProfessionals = [...filteredProfessionals];

    if (sortOption === "mejorCalificacion") {
      sortedProfessionals.sort((a, b) => b.calificacion - a.calificacion);
    } else if (sortOption === "fechaCercana") {
      sortedProfessionals.sort(
        (a, b) => new Date(a.disponible) - new Date(b.disponible)
      );
    } else if (sortOption === "todos") {
      sortedProfessionals = [...professionals];
    }
    setFilteredProfessionals(sortedProfessionals);
  };

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

  return (
    <>
      {filteredProfessionals.length > 0 ? (
        <>
          <div style={{ marginBottom: "400px" }}>
            <div className="row mb-3 p-2">
              <h3 style={{ marginLeft: "150px" }}>Categoria: {alt}</h3>
              <div className="col-md-6" style={{ marginLeft: "150px" }}>
                <div className="dropdown">
                  <label>
                    <h5>
                      <b>Ordenar por</b>
                    </h5>
                  </label>
                  &nbsp;
                  <button
                    className="btn btn-light dropdown-toggle"
                    style={{ color: "#FA7C1F" }}
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></button>
                  <div className="dropdown-menu btn-light bg-light">
                    <button
                      className="dropdown-item"
                      onClick={() => sortProfessionals("todos")}
                    >
                      Todos los profesionales
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => sortProfessionals("mejorCalificacion")}
                    >
                      Los profesionales mejor calificados
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => sortProfessionals("fechaCercana")}
                    >
                      Fecha disponible
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                {filteredProfessionals.map((professional) => (
                  <div className="col-12 col-md-4 mb-4" key={professional.id}>
                    <div className="card h-100 border-0">
                      <div className="card-body bg-light">
                        <h5 className="card-title">
                          {professional.nombre} {professional.apellido} -{" "}
                          {professional.profesion}
                        </h5>
                        <p className="card-text">
                          Calificación: {renderStars(professional.calificacion)}
                        </p>
                        <p className="card-text">
                          Disponible a partir de:{" "}
                          {new Date(
                            professional.disponible
                          ).toLocaleDateString()}
                        </p>
                        <Link
                          to={`/dash/professionals/${alt}/${professional._id}`}
                          className="btn btn-light"
                        >
                          Ver Perfil
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <h3 className="container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-barrier-block"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v7a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z"></path>
            <path d="M7 16v4"></path>
            <path d="M7.5 16l9 -9"></path>
            <path d="M13.5 16l6.5 -6.5"></path>
            <path d="M4 13.5l6.5 -6.5"></path>
            <path d="M17 16v4"></path>
            <path d="M5 20h4"></path>
            <path d="M15 20h4"></path>
            <path d="M17 7v-2"></path>
            <path d="M7 7v-2"></path>
          </svg>{" "}
          Pagina en Construcción{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-barrier-block"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v7a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z"></path>
            <path d="M7 16v4"></path>
            <path d="M7.5 16l9 -9"></path>
            <path d="M13.5 16l6.5 -6.5"></path>
            <path d="M4 13.5l6.5 -6.5"></path>
            <path d="M17 16v4"></path>
            <path d="M5 20h4"></path>
            <path d="M15 20h4"></path>
            <path d="M17 7v-2"></path>
            <path d="M7 7v-2"></path>
          </svg>
        </h3>
      )}
    </>
  );
};

export default Professionals;
