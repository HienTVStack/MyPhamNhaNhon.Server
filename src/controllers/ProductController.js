// const Category = require("../models/Category");
const Product = require("../models/Product");
const Image = require("../models/Images");
const validate = require("../handlers/validation");

exports.create = async (req, res) => {
    try {
        if (req.body.inStock === "on") {
            req.body.inStock = true;
        }
        const { name, descriptionContent, detailContent, price, imageUploadUrl, inStock, categorySelected, tags, author, type, idSupplier } =
            req.body;

        for (const img of imageUploadUrl) {
            await Image.create({ fileUrl: img });
        }

        for (const item of type) {
            item.salePrice = item.price;
        }

        console.log(idSupplier);
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
            author,
            idSupplier,
            type: type,
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

        res.status(200).json({ message: "OK", success: true, description: "PRODUCT LOAD SUCCESS", products: products });
    } catch (error) {
        res.status(404).json({ success: false, description: "PRODUCT GET ALL FAILED" });
    }
};

exports.getTrash = async (req, res) => {
    try {
        const productTrash = await Product.findDeleted({});

        res.status(200).json({ message: "OK", products: productTrash });
    } catch (error) {
        res.status(200).json({ message: "FAIL", error });
    }
};

exports.getById = async (req, res) => {
    try {
        // res.status(200)
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

exports.getBySlug = async (req, res) => {
    const { slug } = req.params;

    try {
        const product = await Product.findOne({ slug: slug });
        product.numViews += 1;
        await product.save();

        res.status(200).json({ message: "OK", product: product });
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

// [GET] /api/product/category/:id
exports.getProductsByCategory = async (req, res) => {
    const id = req.params.id;

    try {
        const products = await Product.find({ "category._id": id }).limit(6);

        res.status(200).json({ message: "OK", products: products });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", error: error });
    }
};

exports.getProductIntroduce = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: "-1" }).limit(6);

        res.status(200).json({ message: "OK", products: products });
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (req, res) => {
    try {
        const product = await Product.updateOne({ slug: req.body.slug }, req.body);

        if (product) {
            res.status(200).json({ message: "OK", product });
        }
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

exports.addReview = async (req, res) => {
    const { id, reviews } = req.body;

    try {
        const productAddReview = Product.findOneAndUpdate({ _id: id }, { $push: { reviews: reviews } });

        await Promise.all([productAddReview, Product.findOne({ _id: id })])
            .then(([tmp, product]) => {
                if (!tmp) {
                    return res.status(404).json({ message: "FAIL" });
                }
                if (product) {
                    res.status(200).json({ message: "OK", success: true, product: product });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({ message: "FAIL" });
            });
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};

exports.updateImage = async (req, res, next) => {
    const { slug, imageList } = req.body;
    try {
        const productUpdate = await Product.findOneAndUpdate({ slug }, { imageList });
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

//[DELETE] /api/product/delete/:id
exports.forceDelete = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.deleteOne({ _id: id });

        res.status(200).json({ message: "OK" });
    } catch (error) {
        console.log(error);
    }
};

//[DELETE] /api/product/deleted/multiple
exports.destroyMultiple = async (req, res) => {
    const { idList } = req.body;

    try {
        const productDelete = await Product.delete({ _id: { $in: idList } });
        const products = await Product.find({});

        res.status(200).json({ message: "OK" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "FAIL", error });
    }
};

// [POST] /api/product/:id/restored
exports.restoredById = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            await Product.restore({ _id: id });
            res.status(200).json({ message: "OK" });
        } else {
            res.status(404).json({ message: "FAIL" });
        }
    } catch (error) {
        res.status(404).json({ message: "FAIL", err });
    }
};

exports.getProductBySlugCategory = async (req, res) => {
    const { slugCategory } = req.params;
    try {
        const products = await Product.find({ "category.slug": slugCategory }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, description: "GET PRODUCT BY CATEGORY SUCCESS", products });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: true, description: "GET PRODUCT BY CATEGORY FAILED" });
    }
};
