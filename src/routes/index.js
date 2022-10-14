var router = require("express").Router();

router.use("/auth", require("./authRoute"));
router.use("/category", require("./categoryRoute"));

module.exports = router;
