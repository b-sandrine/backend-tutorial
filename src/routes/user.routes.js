var { RegisterUser , LoginUser, FindAllUser } = require('../controllers/user.controller')

var express = require('express')

var router = express.Router();

router
.route('/register')
.post(RegisterUser)

router
.route('/login')
.post(LoginUser)

router
.route('/allusers')
.get(FindAllUser)
 
module.exports = router;
