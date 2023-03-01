var { RegisterUser , LoginUser } = require('../controllers/user.controller')

var express = require('express')

var router = express.Router();

router
.route('/register')
.post(RegisterUser)

router
.route('/login')
.post(LoginUser)
 
module.exports = router;
