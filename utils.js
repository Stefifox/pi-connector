const {verifyToken} = require('./lib/jwtUtils.js')
const cypt = require('node:crypto')

/**
 * Check if the token is valid - Used with express
 * @param req
 * @param res
 * @param next
 * @return {*}
 */
function checkToken (req, res, next) {
    try{
        const token = req.headers["x-access-token"] || req.headers["authorization"].split(" ")[1];
        if (token === undefined) return res.status(403).json({status: 403, msg: "A token is required"});
        const tokenResponse = verifyToken(token);
        if(tokenResponse.status === 401) return res.status(401).json({status: 401, msg: "Invalid token"});
        req.info = verifyToken(token)
    }catch (e){
        return res.status(401).json({status: 401, msg: "Invalid token"})
    }

    return next();
}


/**
 * Convert a password from a clear string to sha512
 * @param clearText {string} base password
 * @param userUid {string} user uid - used for salting
 * @return {string} sha512 converted string
 */
function makePassword(clearText, userUid){

    const hashMethod = cypt.createHash('sha512')

    const salt = cypt.createHash('md5').update(userUid.toUpperCase()).digest('hex').toString()
    const saltedPass = clearText + salt

    hashMethod.update(saltedPass)

    return hashMethod.digest('hex').toString()

}

function sendError(err, res){
    res.status(500).json({
        code: 500,
        msg: err
    })
}

module.exports={
    checkToken,
    makePassword,
    sendError
}