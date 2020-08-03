'use strict'
require('dotenv').config()
const level = require('level')
const crypto = require('crypto');

const db = level('keys.db', { valueEncoding: 'json' })
const secret = process.env.HASH_SECRET

const keys = module.exports

/**
 * Record to be saved
 */
keys.record = {
	name: '',
	alias: '',
	ticker: '',
	keyType: '',
	keyValue: '',
	address: '',
}

/**
 * Get hash of record string and use it as key for the record
 */
keys.dbKey = crypto.createHash('sha256')
					.update(JSON.stringify(this.record))
					.digest('hex')

/**
 * Get a record from the database whose key is keys.dbKey
 * Returns a json object where key is keys.dbKey.
 */
keys.getRecord = () => {
	db.get(this.dbKey)
	.then((value) => { return { dbKey:value } })
	.catch((err) => { console.error(err) })
}

/**
 * Save the record into database
 * Returns the record's database entry 
 */
keys.putRecord = () => {
	db.put(this.dbKey, JSON.stringify(this.record))
	.then(() =>  { return db.get(this.dbKey) })
	.then((value) => {  })
	.catch((err) => { console.error(err) })
}

/**
 * Get all records from keys.db
 * Returns an array
 */
keys.getAllRecords = () => {
	var allKeys = []
	db.createReadStream()
	.on('data', (data) => {
		allKeys.push(data)
	})
	.on('error', (err) => {
		console.error(err)
	})
	.on('close', () => {
		// console.log('Stream closed')
	})
	.on('end', () => {
		// console.log('Stream ended')
	})

	return allKeys
}

/**
 * Get records from keys.db whose ticker is @param {string} ticker.
 * Returns an array
 * @param {string} ticker 
 */
keys.getCoinKeys = (ticker) => {
	var coinKeys = []
	db.createReadStream()
	.on('data', (data) => {
		var record = JSON.parse(data)
		if( record.ticker == ticker ) {
			coinKeys.push(record)
		}

		return coinKeys
	})
	.on('error', (err) => {
		console.error(err)
	})
	.on('close', () => {
		// console.log('Stream closed')
	})
	.on('end', () => {
		// console.log('Stream ended')
	})
	
	return coinKeys
}


db.on('open', () => {
		// console.log('Database opened')
	})
	.on('ready', () => {
		// console.log('Database ready')
	})
	.on('put', () => {
		// console.log('Data put')
	})

