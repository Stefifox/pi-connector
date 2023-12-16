const jwt = require('jsonwebtoken')
const settings = require(`${process.cwd()}/settings.json`)

/**
 * Decode the token
 * @param token {string}
 * @return {Object}
 */
function verifyToken(token){
    try{
        return decodedToken = jwt.verify(token, settings.jwt.key, undefined, undefined)
    }catch (e){
        return {status: 401, message: "Invalid Token"}
    }

}

/**
 * Generate a new token
 * @param content {Object} Token content
 * @param s {Object} Token parameters
 * @return {string}
 */
function generateToken(content, s){
    return jwt.sign(content, settings.jwt.key, s)
}

module.exports = {
    verifyToken,
    generateToken
}