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
      <div className="row p-4" style={{ marginLeft: "116px" }}>
        {filteredProfessionals.map((professional) => (
          <div className="col-md-4 mb-4" key={professional.id}>
            <div className="card h-100 border-0" style={{ width: "25rem" }}>
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
                  {new Date(professional.disponible).toLocaleDateString()}
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
    </>
  );
};

export default Professionals;
