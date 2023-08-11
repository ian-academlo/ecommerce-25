// const Users = require('../models/users.models');
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Users, Cars } = require("../models");
const { sendWelcomeEmail } = require("../utils/sendMail");
const { where } = require("sequelize");

const createUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const hashed = await bcrypt.hash(password, 10);
    const user = await Users.create({ username, email, password: hashed });

    // y acto seguido creo el carrito
    await Cars.create({ userId: user.id });

    res.status(201).end();

    sendWelcomeEmail(email, { username, email, id: user.id });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return next({
        status: 400,
        errorName: "Invalid credentials",
        error: "incorrect email / password",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return next({
        status: 400,
        errorName: "Invalid credentials",
        error: "incorrect email / password",
      });
    }

    // generar un token
    const {
      id,
      username,
      firstname,
      role,
      lastname,
      profileImage,
      validEmail,
      createdAt,
      updatedAt,
    } = user;

    const token = jwt.sign(
      { id, username, email, firstname, lastname, role },
      process.env.JWT_SECRET,
      { algorithm: "HS512", expiresIn: "30m" }
    );

    res.json({
      id,
      username,
      email,
      firstname,
      lastname,
      profileImage,
      validEmail,
      createdAt,
      updatedAt,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_CONFIRM_SECRET, {
      algorithms: "HS512",
    });
    // { username, email, id }
    await Users.update({ validEmail: true }, { where: { id: decoded.id } });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const { file, body } = req;

    const url =
      process.env.NODE_ENV === "production"
        ? `${process.env.URL}/avatars/${file.filename}`
        : `${process.env.URL}:${process.env.PORT}/avatars/${file.filename}`;
    await Users.update(
      { profileImage: url },
      {
        where: { id: Number(body.id) },
      }
    );
    res.json();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  confirmEmail,
  uploadAvatar,
};

// protegiendo endpoints -> autenticando peticiones
