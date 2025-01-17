import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategory, createVideo } from "../../services/servicesApi/servicesApi";
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
  const [errors, setErrors] = useState({});

  // Cargar las categorías desde el servidor
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await getCategory();
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

  // Validar el formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = "El título es obligatorio.";
    }

    if (!formData.imagen_url.trim() || !isValidImageUrl(formData.imagen_url)) {
      newErrors.imagen_url = "La URL de la imagen es inválida o está vacía.";
    }

    if (!formData.video_url.trim() || !isValidVideoUrl(formData.video_url)) {
      newErrors.video_url = "La URL del video es inválida o está vacía.";
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = "La descripción no puede estar vacía.";
    }

    if (!formData.categoria.trim()) {
      newErrors.categoria = "Debe seleccionar una categoría.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Validar formato de URL de imagen
  const isValidImageUrl = (url) => {
    return /\.(jpeg|jpg|gif|png)$/.test(url);
  };

  // Validar formato de URL de video
  const isValidVideoUrl = (url) => {
    return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)/.test(url);
  };

  // Guardar el nuevo video
  const handleSave = async () => {
    if (validateForm()) {
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
        navigate("/");
      } catch (error) {
        console.error("Error al guardar el video:", error);
        alert("Ocurrió un error al guardar el video.");
      }
    } else {
      alert("Por favor, corrige los errores antes de continuar.");
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
    setErrors({});
  };

  return (
    <div className={styles.container}>
      <h2>NUEVO VIDEO</h2>
      <p>COMPLETE EL FORMULARIO PARA CREAR UNA NUEVA TARJETA DE VIDEO</p>
      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
          />
          {errors.titulo && <p className={styles.error}>{errors.titulo}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="imagen_url">Imagen</label>
          <input
            type="text"
            id="imagen_url"
            name="imagen_url"
            value={formData.imagen_url}
            onChange={handleChange}
          />
          {errors.imagen_url && <p className={styles.error}>{errors.imagen_url}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="video_url">Video</label>
          <input
            type="text"
            id="video_url"
            name="video_url"
            value={formData.video_url}
            onChange={handleChange}
          />
          {errors.video_url && <p className={styles.error}>{errors.video_url}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          ></textarea>
          {errors.descripcion && <p className={styles.error}>{errors.descripcion}</p>}
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
          >
            <option value="" hidden>
              Selecciona una categoría
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.nombre}>
                {categoria.nombre}
              </option>
            ))}
          </select>
          {errors.categoria && <p className={styles.error}>{errors.categoria}</p>}
        </div>
        <div className={styles.actions}>
          <button className={styles.guardar} type="button" onClick={handleSave}>
            Guardar
          </button>
          <button className={styles.limpiar} type="button" onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearVideo;
