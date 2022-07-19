const { body, validationResult } = require('express-validator');
const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
const express = require('express');
require('dotenv').config();


const router = express.Router();

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET_KEY)
}


router.post('/',body("firstName").not().isEmpty().bail().isString().bail().withMessage("Please enter your first name").bail(),
body("lastName").not().isEmpty().bail().isString().bail().withMessage("Please enter your last name").bail(),
body("email").not().isEmpty().bail().isEmail().withMessage("Please enter a valid email address").bail().custom(async (value) => {
    let user = await User.findOne({ email: value }).lean().exec();
    if (user) {
        console.log(user)
        throw new Error("Email already exists");
    }

    return true;
}).bail(),
body("phone").isNumeric().bail().custom(async (value) => {
    value = value.toString();
    if (value.length < 10 && value.length > 10) {
        throw new Error('Unvalid Mobile number');
    }
    return true;
}).bail().custom(async (value) => {
    let phone = await User.findOne({ phone: value }).lean().exec();
    if (phone) {
        console.log(user)
        throw new Error("Already registered with this mobile number");
    }

    return true;
}).bail(),
//body("gender").not().isEmpty().bail().isString().bail().withMessage("Select Your Gender").bail(),
body("password").not().isEmpty().bail().isLength({ min: 8, max: 25 }).withMessage("Password must be atleast 8 char long").bail().custom((value) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!value.match(regex)) {
        throw new Error("Password must be strong");
    }
    return true;
}).bail(),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });

            }

            const user = await User.create(req.body);
            const token = generateToken(user);
            return res.status(201).send({user, token});
        }
        catch (error) {
            return res.status(400).send(error);

        }
    });


router.get("/", async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});



module.exports = router;