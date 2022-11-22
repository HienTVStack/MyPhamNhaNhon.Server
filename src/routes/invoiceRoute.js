const express = require("express");
const InvoiceController = require("../controllers/InvoiceController");
const router = express.Router();

router.get("/getAll", InvoiceController.getAll);
router.get("/:id", InvoiceController.getByIdAuth);
router.post("/create", InvoiceController.create);

module.exports = router;
