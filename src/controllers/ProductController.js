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

        console.log(categorySelected);

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
        console.log(error);
        res.status(404).json({ message: "FAIL", error });
    }
};

exports.getAll = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });

        res.status(200).json({ message: "OK", products: products });
    } catch (error) {
        res.status(404).json(error);
    }
};

exports.getById = async (req, res) => {
    try {
        console.log(req.params);

        // res.status(200)
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

exports.getBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug: slug });

        res.status(200).json({ message: "OK", product: product });
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

exports.update = async (req, res) => {
    try {
        const product = await Product.remove({ slug: req.body.slug }, req.body);

        if (product) {
            res.status(200).json({ message: "OK", product });
        }
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

exports.updateImage = async (req, res, next) => {
    const { slug, imageList } = req.body;
    try {
        const productUpdate = await Product.findOneAndUpdate(
            { slug },
            { imageList }
        );
        const product = await Product.findOne({ slug });

        Promise.all([productUpdate, product])
            .then(([pr, product]) => {
                res.status(200).json({ message: "OK", product: product });
            })
            .catch((err) => {
                res.status(404).json({ message: "FAIL", err });
            });
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

// [POST] /api/product/:id/destroy
exports.destroyById = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.delete({ _id: id });
        res.status(200).json({ message: "OK" });
    } catch (err) {
        console.log(err);
        res.status(404).json({ message: "FAIL", err });
    }
};

// [POST] /api/product/:id/restored
exports.restoredById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        if (id) {
            const product = await Product.restore({ _id: id });

            res.status(200).json({ message: "OK", product });
        } else {
            res.status(404).json({ message: "FAIL" });
        }
    } catch (error) {
        res.status(404).json({ message: "FAIL", err });
    }
};
