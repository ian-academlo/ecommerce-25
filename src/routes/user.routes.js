const { Router } = require("express");
const {
  createUser,
  loginUser,
  confirmEmail,
} = require("../controllers/users.controller");
const {
  loginUserValidator,
  registerUserValidator,
} = require("../validators/users.validators");
const hasRole = require("../middlewares/role.middleware");
const authenticate = require("../middlewares/auth.middleware");

// primero importen lo nativo node
// de librerias express, express-validator

// importo mis archivos, modulos

const router = Router();

// ? que campos debo validar
// ? que deberia validar por cada campo

router.post("/users", registerUserValidator, createUser); //

router.post("/login", loginUserValidator, loginUser);

router.post("/confirm-email", confirmEmail);

router.get(
  "/confidential",
  authenticate,
  hasRole("admin"),
  (req, res, next) => {
    res.send("Esto es confidencial");
  }
);

module.exports = router;

// "1234" -> bcryp() -> 04c56e389764dfg43034kgl67435 (hash)

// //! 04c56e389764dfg43034kgl67435 --> dehash() --> "1234"

// para que no sea reversible
// podemos hashear un texto
// pero no podemos deshashearlo

// * Existen tablas que tienen las palabras que originan un hash

// Para evitar esto usamos algo llamado salt
// Son digitos aleatorios que se agreagan con la contraseña
// puede ser al principio o puede ser al final
// para que no sea reversible

// "root" + "salt"
// 1238462183476root
// root230986452183746

// 2 round

// 04c56e389764dfg43034kgl67435 --> hashear

/*

  user --> 0
  colaborador -> 1
  socio -> 2
  admin -> 3
  propietario -> 4

  role minimo es socio   valor del role >= 2


  socio, admin, propietario
*/
