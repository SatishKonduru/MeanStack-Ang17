require('dotenv').config()

function checkRole(req, res, next) {
    if(res.locals.role == process.env.USER){
     return   res.status(401).send({
            message: 'User is NOT allowed for this Request'
        })
    }
    else{
        next()
    }
}

module.exports = {checkRole: checkRole}