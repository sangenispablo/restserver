const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está en la BD`);
  }
};

const existeEmail = async (correo = "") => {
  // Verifico el correo si existe
  const existeCorreo = await Usuario.findOne({ correo });
  if (existeCorreo) {
    throw new Error(`El correo ${correo} ya existe en la BD`);
  }
};

module.exports = {
  esRoleValido,
  existeEmail,
};
