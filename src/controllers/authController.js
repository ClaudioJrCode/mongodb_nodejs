const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/hashtoken.json')
const User = require('../models/user.js')//Importando o modelo de cadastro do DB

const router = express.Router();




function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: '100000'
    });

}




router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: "User Already Exists !!!" });


        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        })

    } catch (err) {
        return res.status(400).send({ error: 'Registration Failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid Password' })
    }

    user.password = undefined;

    res.send({
        user,
        token: generateToken({ id: user.id })
    });



});
//↓↓ 2 - estamos fazendo assim o router ser utilizado no app
////// - (chamando por post a rota /auth/register entramos)
////// - assim todas as rotas feitas com o router terao o prefixo /auth/'nome-da-rota'

module.exports = app => app.use('/auth', router);