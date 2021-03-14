const express = require('express');
const router = express.Router();
const auth = require('../controllers/authcontroller')


router.get('/login',auth.getlogin);
router.get('/signup',auth.signup);
router.post('/login',auth.login);
router.post('/signup',auth.signupuser);
router.post('/logout',auth.logout);

module.exports = router;