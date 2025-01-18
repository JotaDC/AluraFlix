import React, { useEffect, useState } from "react";
import ListaVideos from "../../components/ListaVideos/ListaVideos";
import Banner from "../../components/Banner";
import { getCategory } from "../../services/servicesApi/servicesApi";

function Home() {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategory();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  if (loading) return <p>Cargando categorías...</p>;

  return (
    <>
      <Banner img="home" color="#000000" />
      {categorias.map((categoria) => (
        <ListaVideos key={categoria.id} categoria={categoria.nombre} color={categoria.color} />
      ))}
    </>
  );
}

export default Home;
