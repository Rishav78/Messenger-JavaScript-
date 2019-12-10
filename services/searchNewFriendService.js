let users = require('../model/users');

function buildQuery(req, frnds) {
    const { phone } = req.user;
    const { search } = req.body;
    const { friends } = frnds;
    console.log(phone, search, frnds);
    const query = [
        {
            'phone': {
                '$ne': phone
            }
        },
        {
            '_id': {
                '$nin': friends
            }
        }
    ];
    if(search) query.push({ userName: new RegExp(search) });
    return query;
}

exports.searchNewFriend = async (req, res) => {
    const { _id } = req.user;
    const friends = await users.findById(_id , { friends: 1 });
    const query = buildQuery(req, friends);
    const usrs =  await users.find({ '$and': query }, {
        firstName:1,
        lastName: 1,
        phone:1,
    });
    res.json(usrs);
}