const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get("/getAll", ProductController.getAll);
router.post("/create", ProductController.create);
router.get("/:slug/detail", ProductController.getBySlug);
router.put("/update", ProductController.update);
router.put("/updateImage", ProductController.updateImage);

module.exports = router;
