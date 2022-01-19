const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const { esRoleValido, existeEmail } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio y con minimo de 6 letras").isLength({ min: 6 }),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(existeEmail),
    // check("rol", "No es un rol permitido").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check("rol").custom(esRoleValido),
    // la linea de arriba es igual que la linea de abajo
    // check("rol").custom((rol) => esRoleValido(rol)),
    validarCampos,
  ],
  usuariosPost
);

router.put("/:id", usuariosPut);

router.delete("/", usuariosDelete);

router.patch("/", usuariosPatch);

module.exports = router;
