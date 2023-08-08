// tomar los roles que me pasen como argumento
// compararlo con el rol del usuario

const hasRole = (...roles) => {
  // rest operator
  // todos los parametros que no esten definidos los agrupa en un arreglo
  // ['admin', 'user', 'student']
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role)) {
      next({
        status: 401,
        errorName: "Role Required",
        error: "User have not required role",
      });
    }
    next();
  };
};

module.exports = hasRole;
