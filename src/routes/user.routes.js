var { RegisterUser , LoginUser, FindAllUser , UpdateUser, DeleteUser} = require('../controllers/user.controller')
var { authMiddleware } = require('../middlewares/userAuthMiddleware')

var express = require('express')

var router = express.Router();

router.post('/register', RegisterUser)

router.post('/login',LoginUser)

router.get('/allusers', authMiddleware, FindAllUser)
 
router.delete('/delete/:id', authMiddleware , DeleteUser)

router.put('/update/:id', authMiddleware , UpdateUser)

module.exports = router;