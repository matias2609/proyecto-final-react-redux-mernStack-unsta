const mongoose = require("mongoose");

const professionalSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: { unique: true },
    },
    nombre_apellido: {
      type: String,
      required: true,
    },
    direccion: {
      type: String,
      required: true,
    },
    ocupacion: {
      type: String,
      required: true,
    },
    calificacion: {
      type: String,
      required: false,
    },
    disponibilidad: {
      type: String,
      required: false,
    },
    area: {
      type: String,
      required: false,
    },
    contacto: {
      type: String,
      required: false,
    },
    comentarios: [
      {
        titulo: {
          type: String,
          required: false,
        },
        descripcion: {
          type: String,
          required: false,
        },
        fecha: {
          type: String,
          required: false,
        },
      },
    ],
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Professional", professionalSchema);
