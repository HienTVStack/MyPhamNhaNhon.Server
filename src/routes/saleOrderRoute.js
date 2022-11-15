const express = require("express");
const { body } = require("express-validator");
const route = express.Router();
const validate = require("../handlers/validation");
const SaleOrderController = require("../controllers/SaleOrderController");
const SaleOrder = require("../models/SaleOrder");

route.post("/create", SaleOrderController.create);

module.exports = route;
