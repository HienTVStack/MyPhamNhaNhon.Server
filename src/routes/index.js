const router = require("express").Router();

router.use("/auth", require("./authRoute"));
router.use("/employee", require("./employeeRoute"));
router.use("/category", require("./categoryRoute"));
router.use("/product", require("./productRoute"));
router.use("/blog", require("./blogRoute"));
router.use("/tag", require("./tagRoute"));
router.use("/image", require("./imageRoute"));
router.use("/cart", require("./cartRoute"));
router.use("/saleOrder", require("./saleOrderRoute"));
router.use("/paymentOption", require("./paymentOption"));
router.use("/invoice", require("./invoiceRoute"));

module.exports = router;
