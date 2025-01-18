// import React, { useEffect, useState } from "react";
// import ListaVideos from "../../components/ListaVideos/ListaVideos";
// import Banner from "../../components/Banner";
// import { getCategory } from "../../services/servicesApi/servicesApi";

// function Home() {
//   const [categorias, setCategorias] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategorias = async () => {
//       try {
//         const data = await getCategory();
//         setCategorias(data);
//       } catch (error) {
//         console.error("Error al cargar categorías:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategorias();
//   }, []);

//   if (loading) return <p>Cargando categorías...</p>;

//   return (
//     <>
//       <Banner img="home" color="#000000" />
//       {categorias.map((categoria) => (
//         <ListaVideos key={categoria.id} categoria={categoria.nombre} color={categoria.color} />
//       ))}
//     </>
//   );
// }

// export default Home;
import React, { useEffect, useState } from "react";
import ListaVideos from "../../components/ListaVideos/ListaVideos";
import Banner from "../../components/Banner";
import { getCategory, getVideos } from "../../services/servicesApi/servicesApi";

function Home() {
  const [categorias, setCategorias] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategory();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      } finally {
        setLoadingCategorias(false);
      }
    };

    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (error) {
        console.error("Error al cargar videos:", error);
      } finally {
        setLoadingVideos(false);
      }
    };

    fetchCategorias();
    fetchVideos();
  }, []);

  const actualizarVideo = (videoActualizado) => {
    setVideos((prevVideos) =>
      prevVideos.map((video) =>
        video.id === videoActualizado.id ? videoActualizado : video
      )
    );
  };

  const eliminarVideo = (id) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };
  
  if (loadingCategorias || loadingVideos) return <p>Cargando...</p>;

  return (
    <>
      <Banner img="home" color="#000000" />
      {categorias.map((categoria) => (
        <ListaVideos
          key={categoria.id}
          categoria={categoria.nombre}
          color={categoria.color}
          videos={videos.filter((video) => video.categoria === categoria.nombre)}
          onActualizarVideo={actualizarVideo} // Pasamos la función
          onEliminarVideo={eliminarVideo}
        />
      ))}
    </>
  );
}

export default Home;
