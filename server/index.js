require("dotenv").config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  }),
);

app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("Hello");
});

// recipe openApi
app.get("/api", controllers.recipe);

// user
app.get("/auth", controllers.auth);
app.post("/login", controllers.login);
app.post("/logout", controllers.logout);
app.post("/signup", controllers.signup);
app.delete("/signout", controllers.signout);

// food
app.post("/food", controllers.createFood);
app.patch("/food/:foodId", controllers.updateFood);
app.delete("/food/:foodId", controllers.deleteFood);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
// let server;
// if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
//   const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
//   const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
//   const credentials = { key: privateKey, cert: certificate };

//   server = https.createServer(credentials, app);
//   server.listen(HTTPS_PORT, () => console.log("https server runnning"));
// } else {
// server = app.listen(HTTPS_PORT, () => console.log("server open"));
// }
// module.exports = server;
app.listen(HTTPS_PORT, () => console.log("server open"));
