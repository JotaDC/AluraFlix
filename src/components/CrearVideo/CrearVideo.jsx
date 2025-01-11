import React, { useState } from "react";
import { createVideo } from "../../services/servicesApi/servicesApi";
import styles from "./CrearVideo.module.css";



const CrearVideo = ({ onVideoCreado }) => {
  const [formData, setFormData] = useState({
    id: "",
    titulo: "",
    imagen_url: "",
    video_url: "",
    descripcion: "",
    categoria: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      const nuevoVideo = await createVideo(formData);
      onVideoCreado(nuevoVideo);
      setFormData({
        id: "",
        titulo: "",
        imagen_url: "",
        video_url: "",
        descripcion: "",
        categoria: "",
      });
    } catch (error) {
      console.error("Error al crear el video:", error);
    }
  };

  const handleLimpiar = () => {
    setFormData({
      id: "",
      titulo: "",
      imagen_url: "",
      video_url: "",
      descripcion: "",
      categoria: "",
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2>Crear Nuevo Video</h2>
      <form onSubmit={handleGuardar} className={styles.form}>
        <label>
          ID
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Título
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Imagen URL
          <input
            type="url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
          />
        </label>
        <label>
          Video URL
          <input
            type="url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </label>
        <label>
          Categoría
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </label>
        <div className={styles.buttons}>
          <button type="submit" className={styles.saveButton}>
            Guardar
          </button>
          <button type="button" onClick={handleLimpiar} className={styles.clearButton}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearVideo;
