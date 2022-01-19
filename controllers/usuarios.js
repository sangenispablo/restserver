const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  // Si necesito parametros p/query es decir algo como esto
  // localhost:8080/api/usuarios?q=argentina&edad=23&apikey=123123123123123&nombre=pablo
  // const { q, edad, apikey, nombre = "sin nombre" } = req.query;
  // console.log(q, edad, apikey, nombre);
  const query = { estado: true };

  let { limite = 5, desde = 0 } = req.query;
  if (isNaN(Number(limite))) {
    limite = 5;
  }
  if (isNaN(Number(desde))) {
    desde = 0;
  }

  // const total = await Usuario.countDocuments(query);

  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
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
  res.json(usuario);
};

const usuariosPut = async (req = request, res = response) => {
  // si necesito un Parametro por segmento es decir algo asi localhost:8080/api/usuarios/103434
  // le tengo que poner en el router "/:id" por ejemplo y luego en la funciona del controlador
  const { id } = req.params;
  // En la linea de abajo lo que estoy haciendo es un destructuring y operador spread para el resto
  // de esta forma en resto no estan las variables que menciono antes
  const { _id, password, google, correo, ...resto } = req.body;

  // TODO validar contra BD
  if (password) {
    // Encripto el password
    const salt = bcryptjs.genSaltSync();
    // acá lo vuelvo a meter a password a resto
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json(usuario);
};

const usuariosPatch = (req = request, res = response) => {
  res.json({
    msg: "Patch API Usuarios",
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;

  // Borrado fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
