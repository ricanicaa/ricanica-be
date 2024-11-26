require('dotenv').config()
const { db_info } = require('../config/config.cjs')

const mysql = require('mysql2')
const conn = mysql.createConnection(db_info)

const queryPromise = (query, values = [], connection = conn) => {
	return new Promise((resolve, reject) => {
		connection.query(query, values, (err, result) => {
			if (err) {
				console.error(err)
				reject(err)
			} else {
				resolve(result)
			}
		})
	})
}

module.exports = { queryPromise }
