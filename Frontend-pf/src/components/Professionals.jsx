import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import useTitle from "../hooks/useTitle";

const Professionals = () => {
  const { alt } = useParams();
  const [professionals, setProfessionals] = useState([]);
  useTitle("Buscar Profesionales");

  //GET de profesionales bien el componente se renderice
  useEffect(() => {
    const fetchProfessionals = async () => {
      await axios
        .get("http://localhost:3500/professionals")
        .then((response) => {
          setProfessionals(response.data.professional);
        });
    };

    fetchProfessionals();
  }, []);

  //Filtro para hacer coincidir la ocupacion del profesional y el alt de la imagen
  const filteredProfessionals = professionals.filter(
    (professional) => professional.profesion === alt
  );

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
      <div className="row">
        {filteredProfessionals.map((professional) => (
          <div className="col-md-4 mb-4 p-4" key={professional._id}>
            <div className="card bg-light">
              <div className="card-body container">
                <h5 className="card-title">
                  {professional.nombre} {professional.apellido} -{" "}
                  {professional.profesion}
                </h5>

                <p className="card-text">
                  Calificación: {renderStars(professional.calificacion)}
                </p>
                <p className="card-text">
                  Disponible: {professional.disponible}
                </p>
                <Link
                  to={`/dash/professionals/${alt}/${professional._id}`}
                  className="btn btn-secondary"
                >
                  Ver detalles
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
