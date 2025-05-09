const express = require("express"); //Express: Framework de servidor web para Node.js, facilita la creación de APIs y manejo de rutas.
const sqlite3 = require("sqlite3").verbose(); //SQLite3: Módulo para interactuar con bases de datos SQLite.
const path = require("path"); // Path: Módulo nativo para manejar rutas de archivos.

const app = express(); // Path: Módulo nativo para manejar rutas de archivos.
const PORT = 3000;

// Middleware para analizar formularios y JSON
app.use(express.urlencoded({ extended: true }));// Permite procesar datos de formularios
app.use(express.json());//  Permite procesar datos en formato JSON (application/json).
app.use(express.static(path.join(__dirname, "public"))); //Sirve archivos estáticos desde la carpeta public


// Conectar a la base de datos
const db = new sqlite3.Database("./database.db", (err) => { //Conexión: Abre una conexión a database.db. Si el archivo no existe, SQLite lo crea automáticamente.
    if (err) {
        console.error("Error al conectar a la base de datos:", err.message);
    } else {
        console.log("onectado a la base de datos SQLite");

        // Crear la tabla si no existe
        db.run(`
            CREATE TABLE IF NOT EXISTS personas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT NOT NULL,
                edad INTEGER NOT NULL
            )
        `, (err) => {
            if (err) console.error("Error al crear la tabla:", err.message);
            else console.log("Tabla 'personas' creada o ya existente");
        });
    }
});

// Ruta para insertar un nuevo registro
app.post("/api/personas", (req, res) => {// Método: POST /api/personas
    const { nombre, edad } = req.body; // lo saca index mas a delante
    db.run(
        "INSERT INTO personas (nombre, edad) VALUES (?, ?)",
        [nombre, edad],
        (err) => {
            if (err) {
                console.error(" Error al insertar persona:", err.message);
                res.status(500).json({ error: "Error al insertar persona" });
            } else {
                console.log(" Persona agregada:", nombre, edad);
                res.status(201).json({ mensaje: "Persona agregada correctamente" });
            }
        }
    );
});

// Ruta para obtener todas las personas
app.get("/api/personas", (req, res) => { //Método: GET /api/personas
    db.all("SELECT * FROM personas", (err, rows) => {
        if (err) {
            console.error("Error al recuperar personas:", err.message);
            res.status(500).json({ error: "Error al recuperar personas" });
        } else {
            res.json(rows);
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
