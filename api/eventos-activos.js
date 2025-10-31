// api/eventos-activos.js
const express = require('express');
const router = express.Router();

/**
 * Este módulo exporta el router de Express para manejar la ruta de eventos activos.
 * @param {object} db - La conexión a la base de datos (pasada desde server.js).
 */
module.exports = (db) => {
    // La ruta de consulta será GET /eventos-activos/ (ya que server.js le da el prefijo)
    router.get('/', (req, res) => {
        // Consulta SQL para obtener eventos donde la hora actual (NOW())
        // esté entre la hora de inicio y la hora de fin.
        const sql = `
            SELECT titulo, latitud, longitud, tema
            FROM eventos_temporales
            WHERE NOW() BETWEEN hora_inicio AND hora_fin;
        `;

        db.query(sql, (err, results) => {
            if (err) {
                console.error("Error al consultar eventos temporales:", err);
                // Devolvemos un array vacío en caso de error para que la app no falle
                return res.status(500).json([]); 
            }
            
            // Si hay eventos, devuelve un array de objetos con título, coordenadas y tema.
            res.json(results);
        });
    });

    return router;
};