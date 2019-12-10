let users = require('../model/users');

exports.SignupServices = async (req, res) => {
    const { firstName, lastName, password, phone } = req.body,
          status = 1;
    const user = await users.findOne({ phone });
    if(user) return res.json({success: false});;
    let newUser = new users({ firstName, lastName, password, phone, status });
    newUser.save((err) => {
        if(err) throw err;
        res.json({success: true});
    }); 
}