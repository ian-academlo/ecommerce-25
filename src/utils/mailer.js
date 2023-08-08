// importar nodemailer
const nodemailer = require("nodemailer");
require("dotenv").config();

// crear el transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // send mail transfer protocol
  port: 465,
  secure: true,
  auth: {
    user: process.env.G_USER,
    pass: process.env.G_PASSWORD,
  },
});

// exportar el transporter
module.exports = transporter;
