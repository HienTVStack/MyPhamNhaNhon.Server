const express = require("express");
const ImageController = require("../controllers/ImageController");
const router = express.Router();

router.get("/getAll", ImageController.getAll);
router.post("/create", ImageController.create);

module.exports = router;
