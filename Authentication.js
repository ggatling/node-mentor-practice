const express = require('express');
const passport = require('passport');

const router = express.Router();

router.post('/login',loginUser);
router.post('/logout', logout);

passport.use(
    'local-login-spa',
    new LocalStrategy(
        {
            username: 'login',
            password: 'password',
        },
        async (login, password, callback) => {
            try
        }
    )
)