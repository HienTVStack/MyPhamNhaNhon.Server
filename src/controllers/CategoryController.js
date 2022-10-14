const Category = require("../models/Category");

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({ categories });
    } catch (error) {
        res.status(404).json({
            message: `Có lỗi xảy ra khi lấy danh sách danh mục sản phẩm`,
            error,
        });
    }
};

exports.createCategory = async (req, res) => {
    console.log(req.body);
    try {
        const category = await Category.create({ name: "Dưỡng ẩm" });

        res.status(200).json(category);
    } catch (error) {
        res.status(404).json({
            message: `Không thể tạo mới danh mục sản phẩm`,
            error,
        });
    }
};
