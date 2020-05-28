const User = require('../../models/user.model');
const UserSession = require('../../models/usersession.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports.signup = (req, res, next) => {
    const { body } = req;
    let { name, email, password, phone } = body;

    email = email.toLowerCase();

    User.find({
        email: email
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server error'
            })
        }
        else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                errorEmail: true,
                errorMessage: 'Error: Account already exist.'
            })
        }
        else {
            let newUser = new User();
            newUser.name = name
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.phone = phone;
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error.'
                    })
                } else {
                    return res.send({
                        success: true,
                        errorMessage: 'Signed Up'
                    })
                }
            })
        }
    })
};

module.exports.signin = (req, res, next) => {
    const { body } = req;
    let email = body.body.email;
    let password = body.body.password;

    email = email.toLowerCase();
    console.log(email, password);
    User.find({
        email: email
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server error'
            })
        }

        // Find user exist in db
        if (users.length !== 1) {
            return res.send({
                success: false,
                errorEmail: true,
                errorPassword: false,
                errorMessage: 'Email Invalid'
            })
        }

        // If user is found, compare password
        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                errorEmail: false,
                errorPassword: true,
                errorMessage: 'Password Invalid'
            })
        }

        //If user, password are valid
        let userSession = new UserSession();
        const token = jwt.sign({ userId: user._id }, process.env.jwtKey)
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    isAdmin: user.isAdmin,
                    message: 'Server error'
                })
            }

            return res.send({
                success: true,
                errorEmail: false,
                errorPassword: false,
                errorMessage: 'Valid sign in',
                token
            })
        })
    })
}

module.exports.verify = (req, res, next) => {
    const { userId } = req;
    User.find({
        _id: userId,
        isDeleted: false
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server error'
            })
        }

        if (users.length !== 1) {
            return res.send({
                success: false,
                message: 'Invalid'
            })
        }

        return res.send({
            success: true,
            name: users[0].name,
            message: 'Good'
        })
    });
}

module.exports.getInfo = async (req, res, next) => {
    const { phone, seller } = req;
    res.send({
        success: true,
        phone: phone,
        name: seller
    })
}

module.exports.requireToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(400).send({
            success: false,
            message: 'You must logged in'
        })
    }

    const token = authorization.replace('Bearer ', "");
    jwt.verify(token, process.env.jwtKey, async (err, payload) => {
        if (err) {
            return res.status(400).send({
                success: false,
                message: 'You must logged in'
            })
        }

        const { userId } = payload;
        await User.findById({
            _id: userId
        }, (err, user) => {
            if (err) {
                res.send({
                    success: false,
                    message: `Server error`
                })
            }
            req.userId = userId;
            req.isAdmin = user.isAdmin;
            req.seller = user.name;
            req.phone = user.phone;
            next();
        })
    })
}