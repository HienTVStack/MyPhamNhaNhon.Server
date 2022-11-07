const Blog = require("../models/Blog");

exports.getAll = async (req, res) => {
    try {
        const blogs = await Blog.find({});

        res.status(200).json({ message: "OK", blogs: blogs });
    } catch (error) {
        res.status(404).json({ message: "FAIL", description: "ERR_01" });
    }
};

exports.create = async (req, res) => {
    const { isPublic, isReview } = req.body;
    try {
        if (isPublic === "on") {
            req.body.isPublic = true;
        }
        if (isReview === "on") {
            req.body.isReview = true;
        }
        const blog = Blog.create(req.body);

        res.status(200).json({ message: "OK", blog: blog });
    } catch (error) {
        res.status(404).json({ message: "FAIL", description: "ERR_01", error });
    }
};
