import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Professionals = () => {
  const { alt } = useParams();
  const [professionals, setProfessionals] = useState([]);

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
    (professional) => professional.ocupacion === alt
  );

  return (
    <>
      <div className="row">
        {filteredProfessionals.map((professional) => (
          <div className="col-md-4 mb-4 p-4" key={professional._id}>
            <div className="card bg-light">
              <div className="card-body container">
                <h5 className="card-title">{professional.nombre_apellido}</h5>
                <p className="card-text">Profesión: {professional.ocupacion}</p>
                <p className="card-text">
                  Calificación: {professional.calificacion}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Professionals;
