let jwt = require('jsonwebtoken')

const CheckToken=async(req, res, next)=>{
    // console.log("Hello World")
    let token = req.headers.authorization.split(' ')[1] // Raw : Bearer "TOKEN"
    if(token){
        try{
            let encoded = await jwt.verify(token, 'secret')
            req.user = encoded
            next()
        }catch(err){
            if(err){
                res.json({invalid_token: true})
            }
        }
    }
}

module.exports = CheckToken