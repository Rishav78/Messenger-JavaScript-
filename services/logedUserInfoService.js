const users = require('../model/users');

exports.logedUserInfo = async (req, res) => {
    const { _id } = req.user;
    const user = await users.findById(_id, { password: 0 })
    res.json(user);
}