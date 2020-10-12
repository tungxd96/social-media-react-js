const express = require('express');
const users = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../database/db');

users.use(cors());

users.post('/register', async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            dob,
            gender,
            email,
            password,
            locationId,
            avaSrc,
        } = req.body;
        const register = await pool.query(`select * from profile where email='${email}'`);
        if (register.rows.length === 0) {
            const salt = bcrypt.genSaltSync(10);
            const ecryptedPassword = bcrypt.hashSync(password, salt);
            const displayName = firstName + ' ' + lastName;
            const profile = await pool.query(
                'insert into profile (firstName, lastName, displayName, dob, gender, email, password, locationId, avaSrc) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
                [firstName, lastName, displayName, dob, gender, email, ecryptedPassword, locationId, avaSrc]
            );

            if (profile.rows.length > 0) {
                res.json(profile.rows[0]);
            }
            else {
                res.json({ error: 'Failed to register new user' })
            }
        }
        else {
            res.json({ error: 'User already exists' });
        }
    }
    catch (err) {
        console.log('Register new user', err.message);
    }
});

users.post('/login', async(req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const login = await pool.query(`select * from profile where email='${email}'`);
        if (login.rows.length > 0) {
            const user = login.rows[0];
            
            if (bcrypt.compareSync(password, user.password)) {
                const payload = {
                    _id: user.userid
                };
                let token = jwt.sign(payload, 'login', {
                    expiresIn: 1440
                });
                res.send(token);
            }
            else {
                res.json({ error: 'Password is incorrect' });
            }
        }
        else {
            res.json({ error: 'User does not exist' });
        }
    }
    catch (err) {
        console.log('Login to user account', err.message);
    }
});

users.get('/profile/:id', async(req, res) => {
    try {
        const {
            id
        } = req.params;

        const profile = await pool.query(`select * from profile where userid='${id}'`);
        if (profile.rows.length > 0) {
            res.json(profile.rows[0]);
        }
        else {
            res.json({ error: 'User does not exist' });
        }
    }
    catch (err) {
        console.log('Get user profile', err.message);
    }
});

users.get('/search/:kw', async(req, res) => {
    try {
        const {
            kw
        } = req.params;

        const result = await pool.query(`SELECT * FROM profile WHERE displayname~'${kw}'`);
        if (result.rows.length > 0) {
            res.json(result.rows);
        }
        else {
            res.json({ notFound: 'No search results' });
        }
    }
    catch (err) {
        console.log('Search user', err.message);
    }
});

module.exports = users;