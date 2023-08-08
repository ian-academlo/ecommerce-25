const supertest = require("supertest");
const app = require("../app");
const server = require("../server");

const api = supertest(app);

describe("Probando la ruta raiz", () => {
  test("Debo recibir un status 200 en GET /", async () => {
    await api.get("/").expect(200);
  });

  test("Debo recibir como respuesta un formato json", async () => {
    await api
      .get("/")
      .expect("Content-Type", "application/json; charset=utf-8");
  });

  test("La respuesta debe ser un objeto", async () => {
    const { body } = await api.get("/");
    expect(body).toBeInstanceOf(Object);
  });

  test("La respuesta debe incluir la propiedad message", async () => {
    const { body } = await api.get("/");
    expect(body).toHaveProperty("message");
  });
});

describe("Pruebas para el login de un usuario", () => {
  test("Debe marcar error si no pasamos la contraseña", async () => {
    await api
      .post("/login")
      .send({ email: "ian.rosas@academlo.com" })
      .expect(400);
  });
  test("Debe marcar error si no pasamos el email", async () => {
    await api.post("/login").send({ password: "Whatsclone-123" }).expect(400);
  });
  test("Debe marcar error si el usuario no existe", async () => {
    await api
      .post("/login")
      .send({ email: "rosas@yahoo.com", password: "Whatsclone-123" })
      .expect(400);
  });
  test("Debe marcar error si la contraseña es incorrecta", async () => {
    await api
      .post("/login")
      .send({ email: "ian.rosas@academlo.com", password: "Whatsclone" })
      .expect(400);
  });
  test("Deberia responder un 200 si el usuario se pudo loggear", async () => {
    await api
      .post("/login")
      .send({ email: "ian.rosas@academlo.com", password: "Whatsclone-123" })
      .expect(200);
  });
  test("Deberia responder un objeto", async () => {
    const { body } = await api
      .post("/login")
      .send({ email: "ian.rosas@academlo.com", password: "Whatsclone-123" });
    expect(body).toBeInstanceOf(Object);
  });
  test("Deberia responder con formato json", async () => {
    await api
      .post("/login")
      .send({ email: "ian.rosas@academlo.com", password: "Whatsclone-123" })
      .expect("Content-Type", "application/json; charset=utf-8");
  });
  test("La respuesta debe contener un token", async () => {
    const { body } = await api
      .post("/login")
      .send({ email: "ian.rosas@academlo.com", password: "Whatsclone-123" });
    expect(body).toHaveProperty("token");
  });
});

afterAll(() => {
  server.close();
});
