const express = require("express");
const cors = require("cors");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuarioPath = "/api/usuarios";

    // Conexion a la BD (mongodb atlas o local)
    this.conectarDb();

    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();
  }

  async conectarDb() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // lectura y parseo del body
    this.app.use(express.json());

    // Directorio Public con un index.html
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuarioPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
