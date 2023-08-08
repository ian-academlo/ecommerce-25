const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  try {
    // recuperar el token
    const token = req.headers.authorization.split(" ")[1];
    // Bearer eyJhbGciO => ['Berarer', 'eyJhbGciO...']
    if (!token) {
      return next({
        status: 401,
        errorName: "No token",
        error: "No token present in headers",
      });
    }

    // verificar el token
    // si el token es válido => nos decodifica la informacion y devuelve el objeto con la info del usuario
    // si no es valido lanza una excepción -> que tenemos que manejarla con un catch
    console.log(token);
    const decoded = await jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: "HS512",
    });

    //? un middleware puede modificar el objeto request
    req.user = decoded;
    next();
  } catch (error) {
    next({
      status: 498,
      errorName: "Invalid token",
      error,
    });
  }
};

module.exports = authenticate;
