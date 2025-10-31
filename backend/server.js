const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const PORT = 3001;

const app = express();
const eventosActivosRouter = require('../API/eventos-activos');


app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "appavellaneda",
  // port: 3308
});

app.use('/eventos-activos', eventosActivosRouter(db));

db.connect(err => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a la base de datos appavellaneda");
});

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor Node.js conectado con MySQL ✅");
});

// Obtener todos los usuarios (para pruebas)
app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return res.status(500).send("Error en la consulta");
    res.json(results);
  });
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ success: false, message: "Completa todos los campos" });

  db.query(
    "SELECT * FROM usuarios WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ success: false, error: err });
      if (results.length > 0) res.json({ success: true, user: results[0] });
      else res.json({ success: false, message: "Email o contraseña incorrectos" });
    }
  );
});

// Register
app.post("/register", (req, res) => {
  console.log("Datos recibidos para registro:", req.body); // debug

  const { nombre, apellido, telefono, email, password } = req.body;

  if (!nombre || !apellido || !telefono || !email || !password) {
    console.log("Faltan campos"); // debug
    return res.json({ success: false, message: "Completa todos los campos" });
  }

  // Verificar si el email ya existe
  db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.log("Error SQL al buscar email:", err);
        return res.status(500).json({ success: false, error: err });
      }
      if (results.length > 0) {
        console.log("Correo ya registrado:", email);
        return res.json({ success: false, message: "Correo ya registrado" });
      }

      // Insertar nuevo usuario
      db.query(
        "INSERT INTO usuarios (nombre, apellido, telefono, email, password) VALUES (?, ?, ?, ?, ?)",
        [nombre, apellido, telefono, email, password],
        (err2) => {
          if (err2) {
            console.log("Error SQL al insertar usuario:", err2);
            return res.status(500).json({ success: false, error: err2 });
          }
          console.log("Usuario registrado correctamente:", email);
          res.json({ success: true, message: "Usuario registrado correctamente" });
        }
      );
    }
  );
});

// RUTA NUEVA: Obtener Eventos Temporales Activos
app.get("/api/eventos-activos", (req, res) => {
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
      // Devolvemos un array vacío para no romper la app
      return res.status(500).json([]); 
    }

    res.json(results);
  });
});
// RUTA NUEVA: Obtener Noticias Recientes
app.get("/noticias", (req, res) => {
  const sql = `
    SELECT *
    FROM noticias
    ORDER BY fecha DESC
    LIMIT 3;
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error al consultar noticias:", err);
      return res.status(500).json({ error: "Error al obtener noticias" });
    }

    res.json(results);
  });
});



// Levantar servidor en puerto 3001
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
