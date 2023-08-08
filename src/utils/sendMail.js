const path = require("path");
const ejs = require("ejs");
const transporter = require("./mailer");
const jwt = require("jsonwebtoken");

const sendMail = (email, subject, template, attachments) => {
  transporter.sendMail({
    to: email,
    subject,
    html: template,
    attachments,
  });
};

// ! para confirmar el correo enviamos la url del front y un token
// localhost:5173/?token=aldkñjfhlkadsñjfalsdkfjlsad

const sendWelcomeEmail = async (email, data) => {
  // obtener la ruta del template
  const templatePath = path.join(__dirname, "../views/welcome/welcome.ejs");
  // obtener la fecha
  // generar un arreglo con el nombre de los 12 meses en español con js ?
  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  const date = new Date();
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  // renderizar el template

  // generar los archivos adjuntos
  const basePath = "../views/welcome/images/";

  const attachments = [
    {
      filename: "_logo.png",
      path: path.join(__dirname, "../views/welcome/images/_logo.png"),
      cid: "logo",
    },
    {
      filename: "contacts_no-bg.gif",
      path: path.join(__dirname, basePath, "contacts_no-bg.gif"),
      cid: "contacts",
    },
  ];

  // genrar un token
  const token = jwt.sign(data, "validaremail", {
    algorithm: "HS512",
    expiresIn: "2h",
  });

  const template = await ejs.renderFile(templatePath, {
    ...data,
    date: `${day} ${months[month]} ${year}`, // 3 agosto 2023
    token,
  });
  sendMail(email, "Bienvenido a mi app", template, attachments);
};

module.exports = {
  sendWelcomeEmail,
};
