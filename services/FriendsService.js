const users = require('../model/users');

exports.addFriend = async (req, res) => {
    const { _id } = req.user;
    const {friendId} = req.body;
    await users.updateOne({ _id }, { '$push': { friends: friendId } });
    await users.updateOne({ _id: friendId }, { '$push': { friends: _id } })
    return res.json({
        success: true
    });
}

exports.getFriends = async (req, res) => {
    const { _id } = req.user;
    const friend = await users.findOne({ _id }, { friends: 1 }).populate('friends');
    res.json(friend);
}