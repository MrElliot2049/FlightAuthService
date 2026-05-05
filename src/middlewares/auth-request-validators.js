const validateUser = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success : false,
            data : {},
            message : "Something went wrong.",
            err : "Email or password is missing"
        });
    }
    next();
}

const validateAdminCheck = (req, res, next) =>  {
    if (!req.body.userId) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Please add a user Id',
            err: 'userId is missing'
        });
    }
    next();
}
module.exports = {
    validateUser,
    validateAdminCheck
}