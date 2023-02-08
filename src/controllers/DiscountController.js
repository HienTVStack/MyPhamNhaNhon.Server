const { isObjectId } = require("../handlers/validation");
const Discount = require("../models/Discount");

exports.getAll = async (req, res) => {
  try {
    const discounts = await Discount.find({}).sort({ createdAt: -1 });

    res.status(200).json({ message: "OK", success: true, description: "GET ALL DISCOUNT LIST SUCCESS", discounts: discounts });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "FAIL", success: false, description: "GET ALL DISCOUNT LIST FAILED" });
  }
};

exports.create = async (req, res) => {
  try {
    const discount = await Discount.create(req.body);

    res.status(201).json({ message: "OK", success: true, description: "CREATE SUCCESS", discount });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "FAIL", success: false, description: "CREATE DISCOUNT FAILED: " + error.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const discount = await Discount.findOneAndUpdate({ _id: id }, { status: status });

    res.status(200).json({ message: "OK", success: true, description: "CHANGE STATUS COUPON SUCCESS" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "FAIL", success: false, description: "CHANGE STATUS COUPON FAILED", error });
  }
};

exports.checkCodeByCustomer = async (req, res) => {
  try {
    const today = new Date();
    const discount = await Discount.findOne({ code: req.body.code, type: 1, status: true });
    if (!discount) {
      return res.status(404).json({ message: "FAILED", success: false, description: "VOUCHER NOT FOUND" });
    }
    let isCheck = false;
    let voucher = null;
    for (const customer of discount.customers) {
      if (customer.id === req.body.idUser) {
        if (today >= discount.startedAt && today <= discount.finishedAt) {
          isCheck = true;
          voucher = {
            startedAt: discount.startedAt,
            finishedAt: discount.finishedAt,
            valueList: discount.valueList[0],
          };
          break;
        }
      }
    }
    return res.status(200).json({
      message: "OK",
      description: "VOUCHER CHECK SUCCESS",
      success: true,
      isCheck,
      voucher,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({ message: "FAILED", success: false, description: "VOUCHER CHECK ERROR" });
  }
};
// Giảm giá trên tổng hóa đơn
exports.checkTotalInvoiceVerifyDiscount = async (req, res) => {
  // const { totalInvoice } = req.body;
  // const discountArr = [];
  // const today = new Date();

  // try {
  //   await Discount.find({
  //     status: true,
  //     type: 2,
  //     //   invoiceMin: { $lte: Number(totalInvoice) },
  //     //   valueList: { $in: { $gt: Number(totalInvoice) } },
  //     startedAt: { $lte: new Date(today) },
  //     finishedAt: { $gt: new Date(today) },
  //   })
  //     .then((discounts) => {
  //       if (discounts.length > 0) {
  //         const { valueList } = discounts[0];
  //         const tmp = valueList.sort((a, b) => a.discountValue - b.discountValue);
  //         let valueDiscount = 0;
  //         let valueDiscountMax = 0;
  //         for (let i = 0; i < tmp.length; i++) {
  //           if (tmp[i].invoiceMin <= totalInvoice) {
  //             valueDiscount = tmp[i].discountValue;
  //             valueDiscountMax = tmp[i].discountValueMax;
  //           }
  //         }

  //         return res.status(200).json({
  //           message: "OK",
  //           success: true,
  //           description: "CHECK DISCOUNT WITH TOTAL INVOICE SUCCESS",
  //           valueDiscount: valueDiscount,
  //           valueDiscountMax: valueDiscountMax,
  //         });
  //       } else {
  //         return res.status(200).json({
  //           message: "OK",
  //           success: true,
  //           description: "CHECK DISCOUNT WITH TOTAL INVOICE SUCCESS",
  //           valueDiscount: 0,
  //           valueDiscountMax: 0,
  //         });
  //       }
  //     })
  //     .catch((err) => console.error(err));
  // } catch (error) {
  //   console.error(error);
  //   res.status(404).json({ message: "FAILED", success: false, description: "CHECK DISCOUNT WITH TOTAL INVOICE FAILED" });
  // }
  try {
    const { totalInvoice } = req.body;
    const today = new Date();

    const discount = await Discount.findOne({
      status: true,
      type: 2,
      startedAt: { $lte: today },
      finishedAt: { $gt: today },
    });

    if (!discount) {
      return res.status(200).json({
        message: "OK",
        success: true,
        description: "CHECK DISCOUNT WITH TOTAL INVOICE SUCCESS",
        valueDiscount: 0,
        valueDiscountMax: 0,
      });
    }

    const valueList = discount.valueList.sort((a, b) => a.discountValue - b.discountValue);
    const eligibleValue = valueList.find((value) => value.invoiceMin <= totalInvoice);

    return res.status(200).json({
      message: "OK",
      success: true,
      description: "CHECK DISCOUNT WITH TOTAL INVOICE SUCCESS",
      valueDiscount: eligibleValue ? eligibleValue.discountValue : 0,
      valueDiscountMax: eligibleValue ? eligibleValue.discountValueMax : 0,
    });
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "FAILED", success: false, description: "CHECK DISCOUNT WITH TOTAL INVOICE FAILED" });
  }
};
