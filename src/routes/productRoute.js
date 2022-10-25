const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get("/getAll", ProductController.getAll);
router.post("/create", ProductController.create);
// router.get("/:id/detail", ProductController.getById);
router.get("/:slug/detail", ProductController.getBySlug);

module.exports = router;
