import React, { useState, useEffect } from "react";
import styles from "./ModalEditar.module.css";
import { getCategory } from "../../services/servicesApi/servicesApi";

const ModalEditar = ({ video, onGuardar, onCancelar }) => {
  const [formData, setFormData] = useState({
    id: video.id,
    titulo: video.titulo,
    imagen_url: video.imagen_url,
    video_url: video.video_url,
    descripcion: video.descripcion,
    categoria: video.categoria,
  });

  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState({});

  // Cargar categorías desde el servidor
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const categoriasObtenidas = await getCategory();
        setCategorias(categoriasObtenidas);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onGuardar(formData);
    } else {
      alert("Por favor, corrige los errores antes de continuar.");
    }
  };

  // Limpiar el formulario
  const handleClearForm = () => {
    setFormData({
      id: video.id,
      titulo: "",
      imagen_url: "",
      video_url: "",
      descripcion: "",
      categoria: "",
    });
    setErrors({});
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onCancelar}>
          &times;
        </button>
        <h2>Editar Video</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
            />
            {errors.titulo && <p className={styles.error}>{errors.titulo}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label>Imagen URL</label>
            <input
              type="text"
              name="imagen_url"
              value={formData.imagen_url}
              onChange={handleChange}
            />
            {errors.imagen_url && <p className={styles.error}>{errors.imagen_url}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label>Video URL</label>
            <input
              type="text"
              name="video_url"
              value={formData.video_url}
              onChange={handleChange}
            />
            {errors.video_url && <p className={styles.error}>{errors.video_url}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
            ></textarea>
            {errors.descripcion && <p className={styles.error}>{errors.descripcion}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label>Categoría</label>
            <select
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
          <div className={styles.buttons}>
            <button type="submit" className={styles.saveButton}>
              Guardar
            </button>
            <button
              type="button"
              onClick={handleClearForm}
              className={styles.clearButton}
            >
              Limpiar formulario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditar;
