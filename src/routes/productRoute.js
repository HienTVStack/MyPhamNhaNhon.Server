const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get("/getAll", ProductController.getAll);
router.post("/create", ProductController.create);

module.exports = router;
