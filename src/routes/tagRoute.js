const express = require("express");
const route = express.Router();

const TagController = require("../controllers/TagController");

route.get("/get-all", TagController.getAll);
route.post("/create", TagController.create);

module.exports = route;
