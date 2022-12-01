const Setting = require("../models/Setting");

const id = "6387e1d444f23633869d3e43";

exports.get = async (req, res) => {
    try {
        const setting = await Setting.findOne({ _id: id });

        res.status(200).json({ success: true, description: "GET SETTING WEBSITE SUCCESS", setting });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, description: "GET SETTING WEBSITE FAILED" });
    }
};

exports.update = async (req, res) => {
    try {
        await Setting.findOneAndUpdate({ _id: id }, req.body);

        res.status(200).json({ success: true, description: "UPDATE INFORMATION WEBSITE SUCCESS" });
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, description: "UPDATE INFORMATION WEBSITE WEBSITE FAILED" });
    }
};
