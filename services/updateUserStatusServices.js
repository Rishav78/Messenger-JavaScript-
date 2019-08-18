const users = require('../model/users');

function updateUserStatus(id, status){
    return users.updateOne({
        _id: id,
    },{
        status,
    })
        .then((result) => {
            console.log("here => ", status, result);
            return {
                success: true,
            }
        });
}

module.exports = {
    updateUserStatus,
}