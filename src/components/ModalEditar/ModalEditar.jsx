// import React, { useState } from "react";
// import styles from "./ModalEditar.module.css";

import React, { useState, useEffect } from "react";
import styles from "./ModalEditar.module.css";
import { fetchCategories } from "../../services/servicesApi/servicesApi"; // Asegúrate de tener esta función en tu servicio

const ModalEditar = ({ video, onGuardar, onCancelar }) => {
 
  const [formData, setFormData] = useState({
    id: video.id,
    titulo: video.titulo,
    imagen_url: video.imagen_url,
    video_url: video.video_url,
    descripcion: video.descripcion,
    categoria: video.categoria,
  });
  console.log(formData)
  const [categorias, setCategorias] = useState([]);

  // Cargar las categorías desde el servidor
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const categoriasObtenidas = await fetchCategories();
        setCategorias(categoriasObtenidas);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
   

  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <h2>Editar Video</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            ID (No editable)
            <input type="text" value={formData.id} readOnly />
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
            <select
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option value="">{video.categoria}</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.nombre}>
                  {categoria.nombre}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.buttons}>
            <button type="submit" className={styles.saveButton}>
              Guardar
            </button>
            <button type="button" onClick={onCancelar} className={styles.cancelButton}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditar;


// const ModalEditar = ({ video, onGuardar, onCancelar }) => {
//   const [formData, setFormData] = useState({
//     id: video.id,
//     titulo: video.titulo,
//     imagen_url: video.imagen_url,
//     video_url: video.video_url,
//     descripcion: video.descripcion,
//     categoria: video.categoria,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onGuardar(formData);
//   };

//   return (
//     <div className={styles.modalBackdrop}>
//       <div className={styles.modalContent}>
//         <h2>Editar Video</h2>
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <label>
//             ID (No editable)
//             <input type="text" value={formData.id} readOnly />
//           </label>
//           <label>
//             Título
//             <input
//               type="text"
//               name="titulo"
//               value={formData.titulo}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Imagen URL
//             <input
//               type="url"
//               name="imagen_url"
//               value={formData.imagen_url}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Video URL
//             <input
//               type="url"
//               name="video_url"
//               value={formData.video_url}
//               onChange={handleChange}
//             />
//           </label>
//           <label>
//             Descripción
//             <textarea
//               name="descripcion"
//               value={formData.descripcion}
//               onChange={handleChange}
//               rows="3"
//             ></textarea>
//           </label>
//           <label>
//             Categoría
//             <input
//               type="text"
//               name="categoria"
//               value={formData.categoria}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <div className={styles.buttons}>
//             <button type="submit" className={styles.saveButton}>
//               Guardar
//             </button>
//             <button type="button" onClick={onCancelar} className={styles.cancelButton}>
//               Cancelar
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ModalEditar;
