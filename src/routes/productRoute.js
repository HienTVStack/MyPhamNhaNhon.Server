const express = require("express");
const ProductController = require("../controllers/ProductController");
const router = express.Router();

router.get("/getAll", ProductController.getAll);
router.post("/create", ProductController.create);
router.get("/:slug/detail", ProductController.getBySlug);
router.put("/update", ProductController.update);
router.put("/updateImage", ProductController.updateImage);
router.post("/:id/destroy", ProductController.destroyById);
router.post("/:id/restored", ProductController.restoredById);

module.exports = router;
