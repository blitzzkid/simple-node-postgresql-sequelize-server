const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const User = require("./routes/users");
app.use("/api/users", User);

const Blog = require("./routes/blogs");
app.use("/api/blogs", Blog);

module.exports = app;
