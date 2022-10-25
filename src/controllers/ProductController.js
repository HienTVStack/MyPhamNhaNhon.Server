const Category = require("../models/Category");
const Product = require("../models/Product");

exports.create = async (req, res) => {
    try {
        if (req.body.inStock === "on") {
            req.body.inStock = true;
        }

        const {
            name,
            descriptionContent,
            detailContent,
            price,
            imageUploadUrl,
            inStock,
            categorySelected,
            tags,
        } = req.body;

        const product = await Product.create({
            name: name,
            descriptionContent: descriptionContent,
            detailContent: detailContent,
            price: price,
            image: imageUploadUrl[0],
            imageList: imageUploadUrl,
            inStock: inStock,
            category: categorySelected,
            tags: tags,
        });

        res.status(200).json({ message: "OK", product });
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

exports.getAll = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({ products });
    } catch (error) {
        res.status(404).json(error);
    }
};
