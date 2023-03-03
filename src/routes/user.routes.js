var { RegisterUser , LoginUser, FindAllUser , UpdateUser, DeleteUser} = require('../controllers/user.controller')

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
.route('/:id')
.delete(DeleteUser)
.put(UpdateUser)

module.exports = router;