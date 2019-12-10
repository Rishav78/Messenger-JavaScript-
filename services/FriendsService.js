const users = require('../model/users');

exports.addFriend = async (req, res) => {
    const { _id } = req.user;
    const {friendId} = req.body;
    await users.updateOne({ _id }, { '$push': { friends: friendId } });
    await users.updateOne({ _id: friendId }, { '$push': { friends: user } })
    return res.json({
        success: true,
        msg: result,
    });
}

exports.getFriends = (req, res) => {
    const { _id } = req.user;
    const friend = users.findOne({ _id }, { friends: 1 }).populate('friends')
    res.json(friend);
}