var { RegisterUser , LoginUser, FindAllUser , UpdateUser, DeleteUser} = require('../controllers/user.controller')

var express = require('express')

var router = express.Router();

router.post('/register', RegisterUser)

router.post('/login',LoginUser)

router.get('/allusers',FindAllUser)
 
router.delete('/delete/:id',DeleteUser)

router.put('/update/:id', UpdateUser)

module.exports = router;