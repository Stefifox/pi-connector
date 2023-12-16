const mysql = require('mysql8')

class mysqlManager {
    username
    password
    host
    database

    /**
     * Connection
     * {object}
     */
    connection

    constructor(settings) {

        const {username, password, host, database} = settings

        this.username = username
        this.password = password
        this.host = host
        this.database = database

        this.connection = {
            host: this.host,
            user: this.username,
            password: this.password,
            database: this.database
        }
    }

    updateConnection() {
        this.connection = {
            host: this.host,
            user: this.username,
            password: this.password,
            database: this.database
        }
    }

    getConnection() {
        return mysql.createConnection(this.connection)
    }

    validateSql(input) {
        if (`${input}`.indexOf(';') >= 0) return ''
        return `${input}`.split("\'").join("\`");
    }

    /**
     * Test the connection to the database
     * @returns {Promise<boolean>}
     */
    testConnection() {
        return new Promise((resolve, reject) => {
            this.execute('select * from information_schema.TABLES LIMIT 1').then(r => {
                return resolve(true)
            }).catch(r => {
                return reject(false)
            })
        })

    }

    /**
     * Execute a SQL query
     * @param query {string}
     * @returns {Promise<any>}
     */
    async execute(query) {
        const conn = this.getConnection()
        return new Promise((resolve, reject) => {
            conn.connect(err => {
                if (err) return reject(err)
            })
            conn.query(query, (err, res) => {
                conn.destroy()
                if (err) return reject(err)
                return resolve(res)
            })
        })
    }

}

module.exports = {mysqlManager}