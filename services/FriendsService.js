const users = require('../model/users');

function addFriend(req, res){
    user = req.user._id;
    let {friendId} = req.body;
    users.updateOne({
        _id: user,
    },{
        $push: { friends: friendId }
    })
        .then((result) => {
            console.log(result);
            users.updateOne({
                _id: friendId,
            },{
                $push: { friends: user }
            })
                .then((result) => {
                    return res.json({
                        success: true,
                        msg: result,
                    });
                });
        });
}

function getFriends(req, res){
    const user = req.user._id;
    users.findOne({
        _id: user,
    },{
        friends: 1,
    })
        .populate('friends')
        .then((result, err) => {
            res.json(result);
        })
}

module.exports = {
    addFriend,
    getFriends,
}