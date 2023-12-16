const settings = require(`${process.cwd()}/settings.json`)
const {mysqlManager} = require("./lib/mysql");
const {ExpressApp} = require("./lib/expressApp");

const db = new mysqlManager(settings.database)
const exp = new ExpressApp(settings.server)

const app = exp.createApp()

/** INIT **/
/**
 * Default api path
 */
app.get('/', (req, res) => {
    db.testConnection()
        .then(() => {
            res.status(200).json({
                code: 200,
                msg: "OK",
                services: {
                    mysql: 'OK',
                    server: 'OK'
                }
            })
        })
        .catch(err => {
            res.status(200).json({
                code: 200,
                msg: "OK",
                services: {
                    mysql: `Error: ${err}`,
                    server: 'OK'
                }
            })
        })
})



/**
 * Start http server
 */
exp.startServer(app)

/**
 * Start https server if enabled
 */
if (settings.server.secure)
    exp.startSecureServer(app, settings.server.certificates)