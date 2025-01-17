// import React, { useEffect, useState } from "react";
// import { getVideos, deleteVideo, updateVideo } from "../../services/servicesApi/servicesApi";
// import ModalConfirmar from "../ModalConfirmar/ModalConfirmar";
// import ModalEditar from "../ModalEditar/ModalEditar"
// import styles from "./ListaVideos.module.css";

import React, { useEffect, useState } from "react";
import { getVideos, deleteVideo, updateVideo } from "../../services/servicesApi/servicesApi";
import ModalConfirmar from "../ModalConfirmar/ModalConfirmar";
import ModalEditar from "../ModalEditar/ModalEditar";
import ModalPlay from "../ModalPlay/ModalPlay";  // Importa el nuevo modal
import styles from "./ListaVideos.module.css";

const ListaVideos = ({ categoria, color }) => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [modalPlayVisible, setModalPlayVisible] = useState(false);  // Estado para el modal de reproducción
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [videoToEdit, setVideoToEdit] = useState(null);
  const [videoToPlay, setVideoToPlay] = useState(null);  // Estado para el video que se va a reproducir

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error al cargar los videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [videos]);

  useEffect(() => {
    if (categoria) {
      setFilteredVideos(videos.filter((video) => video.categoria === categoria));
    } else {
      setFilteredVideos(videos);
    }
  }, [videos, categoria]);

  const handleEliminarClick = (id) => {
    setVideoToDelete(id);
    setModalEliminarVisible(true);
  };

  const handleConfirmarEliminar = async () => {
    try {
      await deleteVideo(videoToDelete);
      setVideos(videos.filter((video) => video.id !== videoToDelete));
    } catch (error) {
      console.error("Error al eliminar el video:", error);
    } finally {
      setModalEliminarVisible(false);
      setVideoToDelete(null);
    }
  };

  const handleCancelarEliminar = () => {
    setModalEliminarVisible(false);
    setVideoToDelete(null);
  };

  const handleEditarClick = (video) => {
    setVideoToEdit(video);
    setModalEditarVisible(true);
  };

  const handleGuardarEditar = async (data) => {
    try {
      const updatedVideo = await updateVideo(videoToEdit.id, data);
      setVideos(
        videos.map((video) =>
          video.id === videoToEdit.id ? { ...updatedVideo } : video
        )
      );
    } catch (error) {
      console.error("Error al editar el video:", error);
    } finally {
      setModalEditarVisible(false);
      setVideoToEdit(null);
    }
  };

  const handleCancelarEditar = () => {
    setModalEditarVisible(false);
    setVideoToEdit(null);
  };

  // Manejo del clic para abrir el modal de reproducción
  const handlePlayVideo = (video) => {
    setVideoToPlay(video);
    setModalPlayVisible(true);
  };

  const handleCerrarModalPlay = () => {
    setModalPlayVisible(false);
    setVideoToPlay(null);
  };

  if (loading) return <p>Cargando videos...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title} style={{ backgroundColor: color }}>
        {categoria ? `${categoria}` : "Lista de Videos"}
      </h2>
      <div className={styles.cards}>
        {filteredVideos.map((video) => (
          <div key={video.id} className={styles.card}>
            <img
              src={video.imagen_url || "./img/sinimagen.png"}
              alt={video.titulo}
              onClick={() => handlePlayVideo(video)}  // Al hacer clic en la imagen, se abre el modalPlay
            />
            <h3>{video.titulo}</h3>
            <div>
             
              <button   onClick={() => handleEliminarClick(video.id)}><img className="styles.eliminar" src="./img/eliminar.png" /> Borrar</button>
              <button  onClick={() => handleEditarClick(video)}><img className="styles.editar" src="./img/editar.png" /> Editar</button>
            </div>
          </div>
        ))}
      </div>

      {modalEliminarVisible && (
        <ModalConfirmar
          mensaje="¿Estás seguro de que deseas eliminar este video?"
          onConfirmar={handleConfirmarEliminar}
          onCancelar={handleCancelarEliminar}
        />
      )}

      {modalEditarVisible && videoToEdit && (
        <ModalEditar
          video={videoToEdit}
          onGuardar={handleGuardarEditar}
          onCancelar={handleCancelarEditar}
        />
      )}

      {modalPlayVisible && videoToPlay && (
        <ModalPlay
          video={videoToPlay}  // Pasa el video que se quiere reproducir al modalPlay
          onCerrar={handleCerrarModalPlay}  // Función para cerrar el modal
        />
      )}
    </div>
  );
};

export default ListaVideos;


// const ListaVideos = ({ categoria, color }) => {
//   const [videos, setVideos] = useState([]);
//   const [filteredVideos, setFilteredVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
//   const [modalEditarVisible, setModalEditarVisible] = useState(false);
//   const [videoToDelete, setVideoToDelete] = useState(null);
//   const [videoToEdit, setVideoToEdit] = useState(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const data = await getVideos();
//         setVideos(data);
//       } catch (error) {
//         console.error("Error al cargar los videos:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, [filteredVideos]);

//   // useEffect(() => {
//   //   if (categoria) {
//   //     setFilteredVideos(videos.filter((video) => video.categoria === categoria));
//   //   } else {
//   //     setFilteredVideos(videos);
//   //   }
//   // }, [videos, categoria]);
  
//   useEffect(() => {
//     if (categoria) {
//       setFilteredVideos(videos.filter((video) => video.categoria === categoria));
//     } else {
//       setFilteredVideos(videos);
//     }
//   }, [videos, categoria]);
  
//   const handleEliminarClick = (id) => {
//     setVideoToDelete(id);
//     setModalEliminarVisible(true);
//   };

//   const handleConfirmarEliminar = async () => {
//     try {
//       await deleteVideo(videoToDelete);
//       setVideos(videos.filter((video) => video.id !== videoToDelete));
//     } catch (error) {
//       console.error("Error al eliminar el video:", error);
//     } finally {
//       setModalEliminarVisible(false);
//       setVideoToDelete(null);
//     }
//   };

//   const handleCancelarEliminar = () => {
//     setModalEliminarVisible(false);
//     setVideoToDelete(null);
//   };

//   const handleEditarClick = (video) => {
//     setVideoToEdit(video);
//     setModalEditarVisible(true);
//   };

//   // const handleGuardarEditar = async (data) => {
//   //   try {
//   //     const updatedVideo = await updateVideo(videoToEdit.id, data);
//   //     setVideos(
//   //       videos.map((video) =>
//   //         video.id === videoToEdit.id ? { ...updatedVideo } : video
//   //       )
//   //     );
//   //   } catch (error) {
//   //     console.error("Error al editar el video:", error);
//   //   } finally {
//   //     setModalEditarVisible(false);
//   //     setVideoToEdit(null);
//   //   }
//   // };
//   const handleGuardarEditar = async (data) => {
//     try {
//       const updatedVideo = await updateVideo(videoToEdit.id, data);
  
//       // Actualizar el estado general de videos
//       setVideos(
//         videos.map((video) =>
//           video.id === videoToEdit.id ? { ...updatedVideo } : video
//         )
//       );
  
//       // Si la categoría actual coincide, actualizamos también la lista filtrada
//       if (!categoria || updatedVideo.categoria === categoria) {
//         setFilteredVideos((prev) =>
//           prev.map((video) =>
//             video.id === videoToEdit.id ? { ...updatedVideo } : video
//           )
//         );
//       } else {
//         // Si el video editado ya no pertenece a la categoría actual, lo eliminamos de la lista filtrada
//         setFilteredVideos((prev) =>
//           prev.filter((video) => video.id !== videoToEdit.id)
//         );
//       }
//     } catch (error) {
//       console.error("Error al editar el video:", error);
//     } finally {
//       setModalEditarVisible(false);
//       setVideoToEdit(null);
//     }
//   };

//   const handleCancelarEditar = () => {
//     setModalEditarVisible(false);
//     setVideoToEdit(null);
//   };

//   if (loading) return <p>Cargando videos...</p>;

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.title} style={{color:color}}>
//         {categoria ? `Videos de ${categoria}` : "Lista de Videos"}
//       </h2>
//       <div className={styles.cards}>
//         {filteredVideos.map((video) => (
//           <div key={video.id} className={styles.card}>
//             <img
//               src={video.imagen_url || "./img/sinimagen.png"}
//               alt={video.titulo}
//             />
//             <h3>{video.titulo}</h3>
//             <div>
//               <button onClick={() => handleEditarClick(video)}>Editar</button>
//               <button onClick={() => handleEliminarClick(video.id)}>
//                 Eliminar
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {modalEliminarVisible && (
//         <ModalConfirmar
//           mensaje="¿Estás seguro de que deseas eliminar este video?"
//           onConfirmar={handleConfirmarEliminar}
//           onCancelar={handleCancelarEliminar}
//         />
//       )}

//       {modalEditarVisible && videoToEdit && (
//         <ModalEditar
//           video={videoToEdit}
//           onGuardar={handleGuardarEditar}
//           onCancelar={handleCancelarEditar}
//         />
//       )}
//     </div>
//   );
// };

// export default ListaVideos;


// const ListaVideos = ({ categoria }) => {
//   const [videos, setVideos] = useState([]);
//   const [filteredVideos, setFilteredVideos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
//   const [modalEditarVisible, setModalEditarVisible] = useState(false);
//   const [videoToDelete, setVideoToDelete] = useState(null);
//   const [videoToEdit, setVideoToEdit] = useState(null);

//   useEffect(() => {
//     const fetchVideos = async () => {
//       try {
//         const data = await getVideos();
//         setVideos(data);
//       } catch (error) {
//         console.error("Error al cargar los videos:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVideos();
//   }, []);

//   useEffect(() => {
//     if (categoria) {
//       setFilteredVideos(videos.filter((video) => video.categoria === categoria));
//     } else {
//       setFilteredVideos(videos);
//     }
//   }, [videos, categoria]);

//   const handleEliminarClick = (id) => {
//     setVideoToDelete(id);
//     setModalEliminarVisible(true);
//   };

//   const handleConfirmarEliminar = async () => {
//     try {
//       await deleteVideo(videoToDelete);
//       setVideos(videos.filter((video) => video.id !== videoToDelete));
//     } catch (error) {
//       console.error("Error al eliminar el video:", error);
//     } finally {
//       setModalEliminarVisible(false);
//       setVideoToDelete(null);
//     }
//   };

//   const handleCancelarEliminar = () => {
//     setModalEliminarVisible(false);
//     setVideoToDelete(null);
//   };

//   const handleEditarClick = (video) => {
//     setVideoToEdit(video);
//     setModalEditarVisible(true);
//   };

//   const handleGuardarEditar = async (data) => {
//     try {
//       await updateVideo(videoToEdit.id, data);
//       setVideos(
//         videos.map((video) =>
//           video.id === videoToEdit.id ? { ...video, ...data } : video
//         )
//       );
//     } catch (error) {
//       console.error("Error al editar el video:", error);
//     } finally {
//       setModalEditarVisible(false);
//       setVideoToEdit(null);
//     }
//   };

//   const handleCancelarEditar = () => {
//     setModalEditarVisible(false);
//     setVideoToEdit(null);
//   };

//   if (loading) return <p>Cargando videos...</p>;

//   return (
//     <div className={styles.container}>
//       <h2 className={styles.titulo}>
//         {categoria ? `Videos de ${categoria}` : "Lista de Videos"}
//       </h2>
//       <div className={styles.cards}>
//         {filteredVideos.map((video) => (
//           <div key={video.id} className={styles.card}>
//             <img
//               src={video.imagen_url || "./img/sinimagen.png"}
//               alt={video.titulo}
//             />
//             <h3>{video.titulo}</h3>
//             <div>
//               <button onClick={() => handleEditarClick(video)}>Editar</button>
//               <button onClick={() => handleEliminarClick(video.id)}>
//                 Eliminar
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {modalEliminarVisible && (
//         <ModalConfirmar
//           mensaje="¿Estás seguro de que deseas eliminar este video?"
//           onConfirmar={handleConfirmarEliminar}
//           onCancelar={handleCancelarEliminar}
//         />
//       )}

//       {modalEditarVisible && videoToEdit && (
//         <ModalEditar
//           video={videoToEdit}
//           onGuardar={handleGuardarEditar}
//           onCancelar={handleCancelarEditar}
//         />
//       )}
//     </div>
//   );
// };

// export default ListaVideos;
