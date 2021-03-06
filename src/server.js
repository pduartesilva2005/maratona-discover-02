const express = require("express");
const routes = require("./routes");
const path = require("path");

const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(3333, () => {
  console.log("Server Started at http://localhost:3333");
});
