const Image = require("../models/Images");

exports.create = async (req, res) => {
    const { fileUrl } = req.body;

    try {
        const image = await Image.create({ fileUrl: fileUrl });

        res.status(200).json({ message: "OK", image });
    } catch (error) {
        res.status(404).json({
            message: "FAIL",
            error: error,
            action: "CREATE IMAGE",
        });
    }
};

exports.getAll = async (req, res) => {
    try {
        const images = await Image.find({});

        res.status(200).json({ message: "OK", images: images });
    } catch (error) {
        res.status(404).json({ message: "FAIL", error: error });
    }
};
