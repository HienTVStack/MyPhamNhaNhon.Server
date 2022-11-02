const Category = require("../models/Category");

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            message: "OK",
            categories: categories,
        });
    } catch (error) {
        res.status(404).json({
            message: `FAIL`,
            error,
        });
    }
};

exports.createCategory = async (req, res) => {
    console.log(req.body);
    try {
        const category = await Category.create({ name: "Dưỡng ẩm" });

        res.status(200).json({ message: "OK", category });
    } catch (error) {
        res.status(404).json({
            message: `FAIL`,
            error,
        });
    }
};

exports.getCategoryBySlug = async (req, res) => {
    const { slug } = req.body;
    try {
        const category = await Category.findOne({ slug });

        if (category) {
            res.status(200).json({ message: "OK", category });
        }
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

exports.updateCategory = async (req, res) => {
    const { id } = req.body;
    try {
        const categoryUpdate = await Category.findOneAndUpdate({ id }, req.body);

        if (categoryUpdate) {
            res.status(200).json({
                message: `OK`,
                category: categoryUpdate,
            });
        }
    } catch (error) {
        res.status(404).json({
            message: `FAIL`,
            error: error,
        });
    }
};
