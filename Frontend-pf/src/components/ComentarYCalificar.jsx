import React, { useState, useEffect } from "react";
import useTitle from "../hooks/useTitle";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as fasStarSolid } from "@fortawesome/free-solid-svg-icons";
import api from "../app/api/api";

const ComentarYCalificar = () => {
  useTitle("Calificar Profesional");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id, token } = useParams();
  const [tokenCalificacion, setTokenCalificacion] = useState();
  const { email, nombre, apellido } = useAuth();
  let nombrePersona = nombre + " " + apellido;

  useEffect(() => {
    api
      .post(`/professionals/commentAndRatingMailGet/${id}`, {
        email,
        token,
      })
      .then((res) => {
        setTokenCalificacion(res.data);
      });
  }, [id, email, token]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .post(`/professionals/addComment/${id}`, {
        nombrePersona,
        descripcion: comment,
        calificacionComentario: rating,
      })
      .then((response) => {
        console.log(response.data);
      });

    setRating(0);
    setHoverRating(0);
    setComment("");
  };

  const isTokenValid =
    tokenCalificacion &&
    token.toLowerCase() === tokenCalificacion.toLowerCase();

  if (!isTokenValid) {
    return (
      <>
        <div
          style={{ marginBottom: "800px", marginLeft: "20px" }}
          className="text-danger"
        >
          Acceso inválido. Puede que haya habido un error o se haya colocado una
          dirección URL diferente a la esperada. <a href="/">Volver</a>
        </div>
      </>
    );
  }

  return (
    <div style={{ marginBottom: "600px", marginLeft: "20px" }}>
      <h2>Calificar Profesional</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Calificación:</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <FontAwesomeIcon
                key={value}
                icon={value <= (hoverRating || rating) ? fasStarSolid : farStar}
                onMouseEnter={() => handleMouseEnter(value)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleRatingChange(value)}
                size="2x"
              />
            ))}
          </div>
        </div>
        <div>
          <label>Comentario:</label>
          <textarea value={comment} onChange={handleCommentChange} />
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default ComentarYCalificar;
