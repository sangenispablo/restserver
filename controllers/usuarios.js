const { request, response } = require("express");

const usuariosGet = (req = request, res = response) => {
  // Si necesito parametros p/query es decir algo como esto
  // localhost:8080/api/usuarios?q=argentina&edad=23&apikey=123123123123123&nombre=pablo
  const { q, edad, apikey, nombre="sin nombre" } = req.query;
  console.log(q, edad, apikey, nombre);
  res.json({
    msg: "get API Usuarios",
  });
};

const usuariosPost = (req = request, res = response) => {
  // Gracias al middleware express.json que procesa todo el body como un json
  // puedo desestructrar la data que viene en el body
  const { nombre, edad } = req.body;
  console.log(nombre, edad);

  res.json({
    msg: "post API Usuarios",
  });
};

const usuariosPut = (req = request, res = response) => {
  // si necesito un Parametro por segmento es decir algo asi localhost:8080/api/usuarios/103434
  // le tengo que poner en el router "/:id" por ejemplo y luego en la funciona del controlador
  const { id } = req.params;
  console.log(id);

  res.json({
    msg: "put API Usuarios",
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
