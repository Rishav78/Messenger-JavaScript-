let users = require('../model/users');

function searchNewFriend(req, res){
    let user = req.user;
    console.log(user.id);
    users.findOne({_id: user.id},{friends: 1})
        .then((friends) => {
            let query = req.body.search ? 
            {
                $and: [
                    {
                        'phone': {
                            $ne: user.phone
                        }
                    },
                    {
                        userName: new RegExp(req.body.search)
                    },
                    {
                        '_id': {
                            $nin: friends.friends,
                        },
                    },
                ]
            } : {
                $and: [
                    {
                        'phone': {
                            $ne: user.phone
                        }
                    },
                    {
                        '_id': {
                            $nin: friends.friends,
                        },
                    },
                ]
            };
            users.find(query,{firstName:1,lastName: 1,phone:1})
                .then((friends) => {
                    res.json(friends);
                });
        })
}

module.exports = {
    searchNewFriend,
}