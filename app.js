require("dotenv").config();
const express = require("express");
const app = express();
const bcryptjs = require("bcryptjs");
const session = require("express-session");
const router = require("./routes/user");

const PORT = process.env.PORT;
const HOST = process.env.HOST;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/resources", express.static("public"));
app.use("/resources", express.static(__dirname + "/public"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

//motor de plantillas
app.set("view engine", "ejs");

const connection = require("./database/db");

app.use(router);


app.listen(PORT, (req, res) => {
  console.log("server listening on " + HOST + PORT);
});
