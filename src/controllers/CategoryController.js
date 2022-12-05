const Category = require("../models/Category");

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();

        res.status(200).json({
            message: "OK",
            success: true,
            categories: categories,
        });
    } catch (error) {
        res.status(404).json({
            message: `FAIL`,
            success: false,
            error,
        });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);

        res.status(200).json({ message: "OK", success: true, category });
    } catch (error) {
        res.status(404).json({
            message: `FAIL`,
            success: false,
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
    const { id } = req.params;
    try {
        const categoryUpdate = await Category.findOneAndUpdate({ _id: id }, req.body);

        if (categoryUpdate) {
            res.status(200).json({
                message: `OK`,
                success: true,
            });
        }
    } catch (error) {
        res.status(404).json({
            message: `FAIL`,
            success: false,
            error: error,
        });
    }
};

exports.destroyCategory = async (req, res) => {
    const { id } = req.params;

    try {
        await Category.deleteOne({ _id: id });

        res.status(200).json({ success: true, description: "DELETED CATEGORY SUCCESS" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, description: "DELETED CATEGORY FAILED" });
    }
};
