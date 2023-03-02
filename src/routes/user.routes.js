var { RegisterUser , LoginUser, FindAllUser , DeleteUser} = require('../controllers/user.controller')

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
 
router
.route('/delete/:id')
.delete(DeleteUser)

module.exports = router;
