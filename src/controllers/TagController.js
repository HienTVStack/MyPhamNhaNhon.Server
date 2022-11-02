const Tag = require("../models/Tag");

exports.create = async (req, res) => {
    try {
        const { name } = req.body;

        const format = /^[0-9a-zA-Z''-]{0,40}$/;

        if (!format.test(name)) {
            res.status(404).json({
                message: "FAIL",
                text: "Chuỗi không được chứa kí tự đặt biệt",
            });
        }

        const tag = await Tag.create({ name });
        console.log(tag);
        res.status(200).json({
            message: "OK",
            tag: tag,
        });
    } catch (error) {
        res.status(404).json({ message: "FAIL", error: error });
    }
};

exports.getAll = async (req, res) => {
    try {
        const tags = await Tag.find({}, { name: true, slug: true });

        res.status(200).json({ message: "OK", tags: tags });
    } catch (error) {
        res.status(404).json({ message: "FAIL", error });
    }
};
