const { Router } = require("express");
const {
  createUser,
  loginUser,
  confirmEmail,
  uploadAvatar,
} = require("../controllers/users.controller");
const {
  loginUserValidator,
  registerUserValidator,
} = require("../validators/users.validators");
const hasRole = require("../middlewares/role.middleware");
const authenticate = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = Router();

router.post("/login", loginUserValidator, loginUser);

router.post("/confirm-email", confirmEmail);

router
  .route("/users")
  .post(registerUserValidator, createUser)
  .put(authenticate, upload.single("avatar"), uploadAvatar);

router.get(
  "/confidential",
  authenticate,
  hasRole("admin"),
  (req, res, next) => {
    res.send("Esto es confidencial");
  }
);

module.exports = router;
