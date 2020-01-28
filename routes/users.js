const express = require("express");
const router = express.Router();
const { User } = require("../sequelize");

router.get("/", (req, res) => {
  User.findAll().then(users => res.json(users));
});

router.post("/", (req, res) => {
  User.create(req.body).then(user => res.json(user));
});

module.exports = router;
