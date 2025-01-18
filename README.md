# Aluraflix

![Aluraflix]()

Aluraflix es una aplicación de catálogo de videos inspirada en Netflix, diseñada para administrar y visualizar videos organizados por categorías. Este proyecto es parte de un desafío del programa Oracle Next Education (ONE).

---

## **Características**
- Listado de videos por categorías.
- CRUD completo: Crear, Leer, Actualizar y Eliminar videos.
- Uso de una API REST para el almacenamiento de videos.
- Los Estilos estan hechos con module style.

---

## **Tecnologías Utilizadas**
- **React**: Biblioteca para construir interfaces de usuario.
- **Async await**: Manejo de solicitudes HTTP.
- **Modele Style**: Estilización de componentes.
- **MockAPI**: Simulación de una API REST.
- **React Router**: Navegación en la aplicación.

---

## **Instalación**
Sigue estos pasos para instalar y ejecutar el proyecto localmente:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JotaDC/AluraFlix
   cd aluraflix
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Ejecuta la aplicación:
   ```bash
   npm start
   ```

---
## **Para el uso de la base de datos en forma local**
Sigue estos pasos para ejectuar el servidor de datos localmente:
1. Modificar Linea 1 de codigo en servicesApi.jsx y comentar linea 2
   Linea1 --> const baseURL = "http://localhost:3000";

2. Ejecutar servidor de datos fake
   json-server --watch ./src/data/db.json --port 3000

## **Uso**
1. Agrega un video proporcionando el título, imagen, video de youtube (https://www.youtube.com/embed/) y categoría.
2. Edita los videos directamente desde la interfaz usando el ícono de edición.
3. Elimina videos usando el ícono de papelera con confirmación de seguridad.

---



