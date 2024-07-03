const express = require('express');
const axios = require('axios');

const app = express();

app.get('/trending/movie/day?', async (req, res) => {
  try {
    // Realizar solicitud a la API de TMDb para obtener películas
    const response = await axios.get('https://api.themoviedb.org/3', {
      params: {
        api_key: 'c84b15de02b182bd760ca972c743c53f' // Reemplaza 'TU_API_KEY' con tu propia clave de API de TMDb
      }
    });

    // Obtener los datos de las películas de la respuesta
    const peliculas = response.data.results;

    // Enviar las películas como respuesta
    res.json(peliculas);
  } catch (error) {
    console.error('Error al obtener películas de TMDb:', error);
    res.status(500).json({ error: 'Error al obtener películas' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});