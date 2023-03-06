var { RegisterUser , LoginUser, FindAllUser , UpdateUser, DeleteUser} = require('../controllers/user.controller')
var { requireAuth } = require('../middlewares/userAuthMiddleware')

var express = require('express')

var router = express.Router();

router.post('/register', RegisterUser)

router.post('/login',LoginUser)

router.get('/allusers', requireAuth, FindAllUser)
 
router.delete('/delete/:id', requireAuth , DeleteUser)

router.put('/update/:id', requireAuth , UpdateUser)

module.exports = router;