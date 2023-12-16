const express = require('express')
const https = require('https')
const http = require('http')
const cors = require('cors')
const fs = require('fs')
const bodyParser = require('body-parser')

class ExpressApp{

    http
    secure
    https

    /**
     *
     * @param settings {Object}
     */
    constructor(settings) {

        this.http = settings.http
        this.secure = settings.secure
        this.https = settings.https

    }

    /**
     * Crea una nuova app express
     * @return {core.Express}
     */
    createApp(){
        const app = express()

        app.use(cors())
        cors({
            origin: false,
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept', 'Origin', 'Host', 'Connection', 'Accept-Encoding', 'Accept-Language', 'Cookie'],
            credentials: false
        });

        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(bodyParser.json());

        /** LOGGER **/
        app.use(function (req, res, next){
            console.log("request -", `${req.method} - ${req.url}`)
            next()
        })

        return app
    }

    /**
     * Start http server on specified port
     * @param app {core.Express}
     */
    startServer(app){
        http.createServer(app).listen(this.http, () => {
            console.log(`App is running on port ${this.http}`, '/')
        })
    }

    /**
     * Start https server on specified port
     * @param app {core.Express}
     * @param cert Certificates folder path
     */
    startSecureServer(app, cert){
        if(!this.secure) throw 'invalid configuration'
        if(!cert || !cert?.key_path || !cert?.cert_path) throw 'invalid certificates config'
        const sslOptions = {
            key: fs.readFileSync(cert.key_path),
            cert: fs.readFileSync(cert.cert_path)
        }
        https.createServer(sslOptions, app).listen(this.https, () => {
            console.log(`App is running on port ${this.https}`, '/')
        });
    }

}

module.exports = {ExpressApp}