const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = (req = request, res = response) => {
  // Si necesito parametros p/query es decir algo como esto
  // localhost:8080/api/usuarios?q=argentina&edad=23&apikey=123123123123123&nombre=pablo
  const { q, edad, apikey, nombre = "sin nombre" } = req.query;
  console.log(q, edad, apikey, nombre);
  res.json({
    msg: "get API Usuarios",
  });
};

const usuariosPost = async (req = request, res = response) => {
  // Gracias al middleware express.json que procesa todo el body como un json
  // puedo desestructrar la data que viene en el body
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });
  // Encripto el password
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);
  // Guardo en la BD
  await usuario.save();
  // Devuelvo el usuario creado
  res.json({
    msg: "post API Usuarios",
    usuario,
  });
};

const usuariosPut = async (req = request, res = response) => {
  // si necesito un Parametro por segmento es decir algo asi localhost:8080/api/usuarios/103434
  // le tengo que poner en el router "/:id" por ejemplo y luego en la funciona del controlador
  const { id } = req.params;
  // En la linea de abajo lo que estoy haciendo es un destructuring y operador spread para el resto
  const { password, google, correo, ...resto } = req.body;

  // TODO validar contra BD
  if (password) {
    // Encripto el password
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "put API Usuarios",
    usuario,
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "Patch API Usuarios",
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.json({
    msg: "delete API Usuarios",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
