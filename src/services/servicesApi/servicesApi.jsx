//const baseURL = "http://localhost:3000"; //En modo Local
//const baseURL="https://my-json-server.typicode.com/JotaDC/aluraFlixdb"; //en internet pero de solo lectura
const baseURL="https://db-alura-flix-con-vercel.vercel.app"; //db en Vercel

// ----------------------Servicios de Videos---------------------------------------
 // Obtener la lista de Videos GET
export const getVideos = async () => {
  try {
    const response = await fetch(`${baseURL}/videos`);
    if (!response.ok) throw new Error("Error al obtener los videos");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

 // Borrar videos DELETE
export const deleteVideo = async (id) => {
  try {
    const response = await fetch(`${baseURL}/videos/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar el video");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

 // Actualizar videos PUT
export const updateVideo = async (id, data) => {
  try {
    const response = await fetch(`${baseURL}/videos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Error al actualizar el video");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
 // Crear Videos POST
export const createVideo = async (video) => {
    const response = await fetch(`${baseURL}/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(video),
    });
    if (!response.ok) throw new Error("Error al crear el video");
    return await response.json();
  };
  

// ----------------------Servicios de Categoria---------------------------------------

 // Obtener la lista de categorías
export const getCategory = async () => {
    try {
      const response = await fetch(`${baseURL}/categorias`);
      if (!response.ok) {
        throw new Error("Error al obtener las categorías");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  
  // Crear una nueva categoría
  export const createCategory = async (categoryData) => {
    try {
      const response = await fetch(`${baseURL}/categorias`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });
  
      if (!response.ok) {
        throw new Error("Error al crear la categoría");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  
  // Actualizar una categoría
  export const updateCategory = async (categoryId, updatedData) => {
    try {
      const response = await fetch(`${baseURL}/categorias/${categoryId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error("Error al actualizar la categoría");
      }
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  
  // Eliminar una categoría
  export const deleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`${baseURL}/categorias/${categoryId}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Error al eliminar la categoría");
      }
      return true; // Retorna true si la eliminación fue exitosa
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };