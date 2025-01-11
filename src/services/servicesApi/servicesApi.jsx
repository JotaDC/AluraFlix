const baseURL = "http://localhost:3000/videos";

export const getVideos = async () => {
  try {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error("Error al obtener los videos");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteVideo = async (id) => {
  try {
    const response = await fetch(`${baseURL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Error al eliminar el video");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateVideo = async (id, data) => {
  try {
    const response = await fetch(`${baseURL}/${id}`, {
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

export const createVideo = async (video) => {
    const response = await fetch("http://localhost:3000/videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(video),
    });
    if (!response.ok) throw new Error("Error al crear el video");
    return await response.json();
  };
  