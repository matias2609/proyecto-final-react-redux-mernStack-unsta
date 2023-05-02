const User = require("../models/User");
const authController = require("../controllers/authController");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//Tiene que devolver "Ya existe este usuario" al querer registrarse con credenciales ya existentes
it("Suite_1_Registro_User_Duplicado", async () => {
  const req = {
    body: {
      nombre: "Franco Nicolas",
      apellido: "Saavedra",
      numeroContacto: "123141234123",
      email: "nicholas0810152015@gmail.com",
      password: "123123",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const error = { code: 11000 };
  User.findOne = jest.fn(() => Promise.resolve(req.body));

  try {
    await authController.register(req, res);
  } catch (error) {
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Ya existe un usuario registrado con ese email",
    });
  }
});

//Login exitoso
it("Suite_2_Login_Valido", async () => {
  const req = {
    body: {
      email: "test@test.com",
      password: "password",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
  };
  const foundUser = {
    email: "test@test.com",
    roles: ["user"],
    nombre: "Test",
    apellido: "User",
    numeroContacto: "1234567890",
    password: await bcrypt.hash("password", 10),
    active: true,
    cuentaConfirmada: true,
  };
  User.findOne = jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(foundUser),
  }));
  bcrypt.compare = jest.fn().mockResolvedValue(true);
  jwt.sign = jest.fn().mockReturnValue("access_token");
  const result = await authController.login(req, res);
  console.log(result);
  expect(User.findOne).toHaveBeenCalledWith({ email: "test@test.com" });
  expect(bcrypt.compare).toHaveBeenCalledWith("password", foundUser.password);
  expect(jwt.sign).toHaveBeenCalledWith(
    {
      UserInfo: {
        email: foundUser.email,
        roles: foundUser.roles,
        nombre: foundUser.nombre,
        apellido: foundUser.apellido,
        numeroContacto: foundUser.numeroContacto,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
  expect(jwt.sign).toHaveBeenCalledWith(
    { email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  expect(res.cookie).toHaveBeenCalledWith("jwt", expect.any(String), {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  expect(res.json).toHaveBeenCalledWith({ accessToken: "access_token" });
});

//Login pero con la cuenta no confirmada
it("Suite_3_Login_Cuenta_no_confirmada", async () => {
  const req = {
    body: {
      email: "test@test.com",
      password: "password",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
  };
  const foundUser = {
    email: "test@test.com",
    roles: ["user"],
    nombre: "Test",
    apellido: "User",
    numeroContacto: "1234567890",
    password: await bcrypt.hash("password", 10),
    active: true,
    cuentaConfirmada: false,
  };
  User.findOne = jest.fn(() => ({
    exec: jest.fn().mockResolvedValue(foundUser),
  }));
  const result = await authController.login(req, res);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({
    message: "Cuenta no confirmada por mail",
  });
});

//No existe esta cuenta
it("Suite_4_Login_Cuenta_Inexistente", async () => {
  const req = {
    body: {
      email: "nonexistent@test.com",
      password: "password",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
  };
  jest.spyOn(User, "findOne").mockReturnValue({
    exec: jest.fn().mockResolvedValue(null),
  });
  await authController.login(req, res);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({
    message: "No existe cuenta con el mail proporcionado",
  });
});

//Login pero con contraseña incorrecta
it("Suite_5_Login_Contraseña_Incorrecta", async () => {
  const req = {
    body: {
      email: "test@test.com",
      password: "wrong_password",
    },
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    cookie: jest.fn(),
  };
  const mockUser = {
    email: "test@test.com",
    password: await bcrypt.hash("password", 10),
    cuentaConfirmada: true,
    active: true,
    roles: ["user"],
    nombre: "Test",
    apellido: "User",
    numeroContacto: "1234567890",
  };
  jest.spyOn(User, "findOne").mockReturnValue({
    exec: jest.fn().mockResolvedValue(mockUser),
  });
  jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
  await authController.login(req, res);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({
    message: "Contraseña Incorrecta",
  });
});
