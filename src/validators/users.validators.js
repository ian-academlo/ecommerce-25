const { check } = require("express-validator");
const validateResult = require("../middlewares/validate.middleware");

const loginUserValidator = [
  // verificar cada una de las propiedades del req
  check("email", "Error con el email")
    .exists()
    .withMessage("Falta el campo de email")
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isString()
    .withMessage("El email no es un string")
    .isEmail()
    .withMessage("No tiene el formato de email"),
  check("password", "Error con el password").exists().notEmpty().isString(),
  validateResult,
];

const registerUserValidator = [
  check("username", "error con username")
    .exists()
    .withMessage("Falta el campo de username")
    .notEmpty()
    .withMessage("El username no debe estar vacio")
    .isString()
    .withMessage("El username no es un string")
    .isLength({ min: 6, max: 30 }),
  check("email", "error con el email")
    .exists()
    .withMessage("Falta el campo de correo")
    .notEmpty()
    .withMessage("El campo de correo no debe estar vacio")
    .isString()
    .withMessage("El campo de correo no es un string")
    .isEmail()
    .withMessage("No tiene el formato de correo")
    .isLength({ min: 10, max: 50 })
    .withMessage("El correo debe tener minimo 10 caracteres y maximo 50"),
  check("password", "error con el password")
    .exists()
    .withMessage("Falta el campo de password")
    .notEmpty()
    .withMessage("El campo de password no debe estar vacio")
    .isString()
    .withMessage("El campo de password no es un string")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%-^&*])[A-Za-z\d!@#$%-^&*]{8,}$/
    )
    .withMessage(
      "La contraseña debe tener minimo 8 caracteres una mayuscula, una minuscula, un numero y un caracter especial"
    ),
  validateResult,
];

module.exports = {
  loginUserValidator,
  registerUserValidator,
};
