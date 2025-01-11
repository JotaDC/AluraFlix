import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCategories,createVideo } from "../../services/servicesApi/servicesApi";
import styles from "./CrearVideo.module.css";


const CrearVideo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: "",
    imagen_url: "",
    video_url: "",
    descripcion: "",
    categoria: "",
  });

  const [categorias, setCategorias] = useState([]);

  // Cargar las categorías desde el servidor
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await fetchCategories()
        setCategorias(categories);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
      }
    };

    loadCategories();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Guardar el nuevo video
  const handleSave = async () => {
    try {
      await createVideo(formData);
      alert("¡Video creado con éxito!");
      setFormData({
        titulo: "",
        imagen_url: "",
        video_url: "",
        descripcion: "",
        categoria: "",
      });
      navigate("/")
    } catch (error) {
      console.error("Error al guardar el video:", error);
      alert("Ocurrió un error al guardar el video.");
      navigate("/")
    }
  };

  // Limpiar el formulario
  const handleClear = () => {
    setFormData({
      titulo: "",
      imagen_url: "",
      video_url: "",
      descripcion: "",
      categoria: "",
    });
  };

  return (
    <div className={styles.container}>
      <h2>Crear Video</h2>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="imagen_url">URL de la Imagen:</label>
          <input
            type="text"
            id="imagen_url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="video_url">URL del Video:</label>
          <input
            type="text"
            id="video_url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
               
              <option key={categoria.id} value={categoria.nombre}>

                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.actions}>
          <button type="button" onClick={handleSave}>
            Guardar
          </button>
          <button type="button" onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearVideo;
