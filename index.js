require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware para manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Error al obtener películas' });
};

// Función para obtener películas de TMDb
const obtenerPeliculas = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day?', {
      params: {
        api_key: "c84b15de02b182bd760ca972c743c53f"
      }
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Error al obtener películas de TMDb');
  }
};

// Ruta para obtener películas
app.get('/peliculas', async (req, res, next) => {
  try {
    const peliculas = await obtenerPeliculas();
    res.json(peliculas);
  } catch (error) {
    next(error);
  }
});

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
