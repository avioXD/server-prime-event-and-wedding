const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const dotEnv = require("dotenv");
const path = require("path");

dotEnv.config({ path: path.join(__dirname, "./config.env") });
app.use(bodyParser.json({ limit: "10240kb" }));
app.use(express.json());
app.use(cors());

// connecting database:
require("./db/connect.db");
//config api
app.use(require("./API/client_api"));
app.use(require("./API/admin_api"));
require("./API/mailer_api");
//open Client side:
app.use(express.static(path.join(__dirname, "./dist/CovidProject")));
app.use(express.static("index.html", { root: "dist/CovidProject" }));
app.use(express.static(path.join(__dirname, "./uploads")));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "./dist")));
app.use(express.static("index.html", { root: "dist" }));
//requests:

// Port :
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
  console.log("Server is running Port: " + PORT);
});
