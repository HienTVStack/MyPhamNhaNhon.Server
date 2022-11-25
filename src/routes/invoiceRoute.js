const express = require("express");
const InvoiceController = require("../controllers/InvoiceController");
const router = express.Router();

router.get("/getAll", InvoiceController.getAll);
router.get("/:id", InvoiceController.getByIdAuth);
router.get("/:id/detail", InvoiceController.getById);
router.post("/create", InvoiceController.create);
router.put("/:id/updateStatus", InvoiceController.updateStatus);

module.exports = router;
