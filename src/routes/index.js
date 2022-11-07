const router = require("express").Router();

router.use("/auth", require("./authRoute"));
router.use("/category", require("./categoryRoute"));
router.use("/product", require("./productRoute"));
router.use("/blog", require("./blogRoute"));
router.use("/tag", require("./tagRoute"));
router.use("/image", require("./imageRoute"));

module.exports = router;
