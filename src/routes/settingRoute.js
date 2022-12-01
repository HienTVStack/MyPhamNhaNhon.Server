const express = require("express");
const router = express.Router();
const SettingController = require("../controllers/SettingController");

router.get("/get", SettingController.get);
router.post("/update", SettingController.update);

module.exports = router;
