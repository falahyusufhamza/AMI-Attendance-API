const Class = require("../database/models/Class");

exports.getClasses = (req, res, next) => {
    const userId = req.query.userId;
    Class.findAll({
        where: {
            userId,
        },
    }).then((classes) => {
        return res.json({
            success: true,
            classes,
        });
    }).catch(() => {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    });
}