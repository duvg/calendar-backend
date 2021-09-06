const {response} = require('express');

// Create new user
const createUser = (req, res = response) => {
    
    res.json({
        ok: true,
        msg: 'register'
    });
}

// Login
const loginUser = (req, res) => {
    res.json({
        ok: true,
        msg: 'login'
    })
};

// Renew user token
const renewToken = (req, res) => {
    res.json({
        ok: true,
        msg: 'renew token'
    })
};

module.exports = {
    createUser,
    loginUser,
    renewToken
}