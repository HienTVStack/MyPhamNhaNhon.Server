const Supplier = require("../models/Supplier");

exports.getAll = async (req, res) => {
    try {
        const suppliers = await Supplier.find({});

        res.status(200).json({ success: true, suppliers, description: "GET ALL SUPPLIER SUCCESS" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, description: "GET ALL SUPPLIER FAILED" });
    }
};

exports.create = async (req, res) => {
    try {
        // const supplier = {
        //     name: "Chi nhánh 2 tiệm mỹ phẩm Nhà Nhơn",
        //     description: "Chi nhánh con của tiệm mỹ phẩm Nhà Nhơn",
        //     address: "Thôn Khương Mỹ, xã Tam Xuân 1, huyện Núi Thành, tỉnh Quảng Nam",
        //     phone: "033.712.2712",
        // };

        await Supplier.create(req.body);
        res.status(200).json({ success: true, description: "CREATE SUPPLIER SUCCESS" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, description: "CREATE SUPPLIER FAILED" });
    }
};
