const users = require('../model/users');

exports.updateUserStatus = async (id, status) => {
    await users.updateOne({ _id: id }, { status });
    console.log("here => ", status);
    return { success: true };
}