const express = require("express");
const route = express.Router();
const SupplierController = require("../controllers/SupplierController");

route.get("/getAll", SupplierController.getAll);
route.post("/create", SupplierController.create);

module.exports = route;
