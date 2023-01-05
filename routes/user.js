const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const connection = require("../database/db");

router.get("/", (req, res) => {
  res.render("index", { msg: "Esto es un mensaje" });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  // const user = req.body.user
  // const name = req.body.name
  // const pass = req.body.pass
  const { user, pass, email } = req.body;

  let passwordHash = await bcryptjs.hash(pass, 8);
  connection.query(
    "INSERT INTO users SET ?",
    { user: user, email: email, pass: passwordHash },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.send("El usuario ha sido registrado con éxito");
      }
    }
  );
});
const numer = 8
router.post("/auth", async (req, res) => {
  const { user, pass } = req.body;

  let passwordHash = await bcryptjs.hash(pass, numer);

  if (user && pass) {
    connection.query(
      "SELECT * FROM users WHERE user = ?",
      [user],
      async (error, results) => {
        if (
          results.length === 0 ||
          !(await bcryptjs.compare(pass, results[0].pass))
        ) {
          res.send("El usuario o contraseña incorrectas");
        } else {
          res.send("Login Correcto");
        }
      }
    );
  }
});

module.exports = router;
