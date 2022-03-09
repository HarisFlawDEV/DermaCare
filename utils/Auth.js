const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../models/User");
const { SECRET } = require("../config");
const { registervalidation, loginvalidation } = require('../utils/Validation');
const { reset } = require("nodemon");


/**
 * @DESC To register the user (DERMATOLOGIST,  PATIENT)
 */
const userRegister = async(userDets, role, res) => {

    // VALIDATE BEFORE SAVING A USER 
    const { error } = registervalidation(userDets);
    if (error) return res.status(400).send(error.details[0].message);

    try {

        // validate the email
        let emailNotRegistered = await validateEmail(userDets.email);
        if (!emailNotRegistered) {
            return res.status(400).json({
                message: "Email is already registered.",
                success: false
            });
        }


        // Hash Passwords
        //generating a salt
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(userDets.password, salt);

        // create a new user
        const newUser = new User({
            ...userDets,
            password,
            role
        });

        await newUser.save();
        return res.status(201).json({
            message: "Hurry! now you are successfully registred. Please nor login.",
            success: true
        });
    } catch (err) {
        // Implement logger function (winston)
        return res.status(500).json({
            message: "Unable to create your account." + err.message,
            success: false
        });
    }
};

/**
 * @DESC To Login the user (patient , derm)
 */
const userLogin = async(userCreds, role, res) => {

    // VALIDATE BEFORE SAVING A USER 
    const { error } = loginvalidation(userCreds);
    if (error) return res.status(400).send(error.details[0].message);

    let { email, password } = userCreds;

    // First Check if the Email is in the database
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({
            message: "Email is not found. Invalid login credentials.",
            success: false
        });
    }

    // We will check the role
    if (user.role !== role) {
        return res.status(403).json({
            message: "Please make sure you are logging in from the right portal.",
            success: false
        });
    }
    // That means user is existing and trying to signin fro the right portal
    // Now check for the password
    let isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        // Sign in the token and issue it to the user
        let token = jwt.sign({
                user_id: user._id,
                role: user.role,
                email: user.email
            },
            SECRET, { expiresIn: "7 days" }
        );

        let result = {
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
        };

        return res.status(200).json({
            ...result,
            message: "Hurray! You are now logged in.",
            success: true
        });
    } else {
        return res.status(403).json({
            message: "Incorrect password.",
            success: false
        });
    }
};

const validateUsername = async username => {
    let user = await User.findOne({ username });
    return user ? false : true;
};

/**
 * @DESC Passport middleware
 */
const userAuth = passport.authenticate("jwt", { session: false });

/**
 * @DESC Check Role Middleware
 */
const checkRole = roles => (req, res, next) =>
    !roles.includes(req.user.role) ? res.status(401).json("Unauthorized") : next();

const validateEmail = async email => {
    let user = await User.findOne({ email });
    return user ? false : true;
};

const serializeUser = user => {
    return {
        dob: user.dob,
        gender: user.gender,
        phone: user.phone,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
    };
};

/**
 * @DESC User Info Update
 */
const profileUpdate = async(obj, user, res) => {

    const id = user._id;

    // Validate Request
    if (!obj) {
        return res.status(400).send({
            message: "Body content can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(id, {
            firstName: obj.firstName,
            lastName: obj.lastName,
            phone: obj.phone,
            gender: obj.gender,
            dob: obj.dob,
            image: obj.image,
        }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + id
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + id
                });
            }
            return res.status(500).send({
                message: "Error updating User with id " + id
            });
        });
};



module.exports = {
    userAuth,
    checkRole,
    userLogin,
    userRegister,
    profileUpdate,
    serializeUser
};