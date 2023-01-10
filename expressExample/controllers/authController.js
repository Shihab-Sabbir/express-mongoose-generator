const AuthModel = require('../models/register');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'redux-mongoose-toolkit';

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AuthModel.findOne({ email: email });
        if (!user) { return res.status(400).json({ message: 'User not exists' }) }
        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return res.status(400).json({ message: 'Invalid email or password !' })
        const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
        res.status(200).json({ username: user.username, email: user.email, role: user.role, token })
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}

const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const existingUser = await AuthModel.findOne({ email: email });
        if (existingUser) { return res.status(400).json({ message: 'User already exists' }) }
        const hashPassword = await bcrypt.hash(password, 10);
        const result = await AuthModel.create({ username, email, password: hashPassword,role });
        res.status(200).json({ message: 'User created successfully.' })
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message })
    }
}



module.exports = { login, register }

//shihab-redux-mongoose-practice
//An12VYlZl7xGLikq

// mongodb + srv://shihab-redux-mongoose-practice:An12VYlZl7xGLikq@corexlab.hzl7mlm.mongodb.net/?retryWrites=true&w=majority