const router = require("express").Router();

router.use("/auth", require("./authRoute"));
router.use("/category", require("./categoryRoute"));
router.use("/product", require("./productRoute"));

router.use("/tag", require("./tagRoute"));

module.exports = router;
