const jwt = require('jsonwebtoken')

function requireAuth( req, res, next ) {
    var token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken ) => {
            if(err) {
                console.log(err.message)
                res.redirect('/login')
            }
            console.log(decodedToken)
            next()
        })
    }
    else {
        res.redirect('/login')
    }
}

module.exports = { requireAuth };