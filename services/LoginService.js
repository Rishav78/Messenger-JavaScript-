const users = require('../model/users');

exports.login = async (phone, password) => {
    const user = await users.findOne({ phone, password });
    if(!user) return { success: false };
    const { _id } = user;
    if(password !== user.password) return { success: false };
    return { success: true, _id };
}

exports.status = async (req, res) => {
    const { _id } = req.user;
    const status = await users.findById(_id, { status: 1 });
    return status.status;
}