'use strict'

require('dotenv').config()
const bitcore = require('@dashevo/dashcore-lib')
const BN = bitcore.crypto.BN
const Point = bitcore.crypto.Point
const PrivateKey = bitcore.PrivateKey
const Networks = bitcore.Networks
const Base58Check = bitcore.encoding.Base58Check
const keys = require('./keys')

const coins = module.exports

/**
 * Connects to Coin Network
 * @param {string} coinName 
 * @param {string} netType 
 */
coins.connect = (coinName, netType) => {
	Networks.add(this[coinName].netSpecs[netType]);
	var coinNetwork = Networks.get(netType)
	return coinNetwork
}

/**
 * Disconnects from Coin Network
 * @param {string} coinName 
 */
coins.disconnect = (coinName) => {
	Networks.remove(this[coinName].network)
}

/**
 * Gets base58 address of the WIF export private key
 * @param {string} privkeyWIF 
 * @param {Network} coinNetwork 
 */
coins.getAddress = (privkeyWIF, coinNetwork) => {
	const privkey = new PrivateKey(privkeyWIF, coinNetwork)
	const publickey = privkey.toPublicKey()
	const address = publickey.toAddress(coinNetwork)
	return address
}

/**
 * Gets base58 address of the WIF export private key
 * @param {string} coinName 
 * @param {string} privkeyWIF 
 * @param {string} netType 
 */
coins.getCoinAddress = (coinName, privkeyWIF, netType) => {
	this[coinName].network = this[coinName].connect(netType)
	var address = this.getAddress(privkeyWIF, this[coinName].network)
	this[coinName].disconnect(this.sapphire.network)

	return address
}

/**
 * Gets specific json object of the coin (example: coins.sapphire)
 * @param {string} coinName 
 */
coins.getCoinObject = (coinName) => {
	return this[coinName]
}

/**
 * Saves name, alias and the ticker of the coin, the WIF export private key and address to the keys.db
 * @param {string} coinName 
 * @param {string} privkeyWIF 
 * @param {string} netType 
 */
coins.saveKeyToDb = (coinName, privkeyWIF, netType) => {
	coinName = 'sapphire'
	keys.record = {
		name: this[coinName].name,
		alias: this[coinName].alias,
		ticker: this[coinName].ticker,
		keyType: 'privkeyWIF',
		keyValue: privkeyWIF,
		address: this[coinName].getAddress(privkeyWIF, netType),
	}

	keys.putRecord()

	return keys.getRecord()
}

/**
 * Specific defining JSON object for Sapphire Coin
 */
coins.sapphire =
{
	name: 'Sapphire Coin',
	alias: 'sapphire',
	ticker: 'SAPP',
	keys: {
		livenet: {
			default: {
				privkeyWIF: process.env.DEFAULT_SAPP_PRIVKEY_WIF,
				address: process.env.DEFAULT_SAPP_ADDRESS,
			}
		}
	},
	network: '',
	netSpecs: {
		livenet: {
			name: 'livenet',
			alias: 'livenet',
			pubkeyhash: 0x3f,
			privatekey: 0x19,
			scripthash: 0x19,
			networkMagic: 0x13b23e58,
			port: 45329,
			dnsSeeds: [
				'localhost',
				'seed1.sappcoin.com',
				'seed2.sappcoin.com',
				'seed3.sappcoin.com',
				'seed4.sappcoin.com',
				'seed5.sappcoin.com',
				'seed6.sappcoin.com',
				'seed7.sappcoin.com',
				'seed8.sappcoin.com',
				'seed9.sappcoin.com',
				'seed10.sappcoin.com',
			],
		},
		testnet: {
			name: 'testnet',
			alias: 'testnet',
			pubkeyhash: 0x8b,
			privatekey: 0xef,
			scripthash: 0x13,
			networkMagic: 0x457665ba,
			port: 46329,
			dnsSeeds: [
				'localhost',
				'seed1.sappcoin.com',
				'seed2.sappcoin.com',
				'seed3.sappcoin.com',
				'seed4.sappcoin.com',
				'seed5.sappcoin.com',
				'seed6.sappcoin.com',
				'seed7.sappcoin.com',
				'seed8.sappcoin.com',
				'seed9.sappcoin.com',
				'seed10.sappcoin.com',
			],
		}
	},
	getAddress: (privkeyWIF, netType) => {
		this.sapphire.network = this.sapphire.connect(netType)
		var address = this.getAddress(privkeyWIF, this.sapphire.network)
		this.sapphire.disconnect(this.sapphire.network)

		return address
	},
	connect: (netType) => {
		return this.connect('sapphire', netType)
	},
	disconnect: (coinNetwork) => {
		this.disconnect('sapphire', coinNetwork)
	}
}

/*
coins.raven =
{
	name: 'Raven Coin',
	ticker: 'RVN',
	keys: {
		livenet: {
			privkeyWIF: '4ij8ku6EC1gxisNE99HS1gDoNCYPPH8563MG1V7VKnQ51V38BeGF',
			pubkey: '',
		}
	},
	netSpecs: {
		livenet: {
			name: 'livenet',
			alias: 'mainnet',
			pubkeyhash: 0x3f,
			privatekey: 0x19,
			scripthash: 0x19,
			networkMagic: 0x13b23e58,
			port: 45329,
			dnsSeeds: [
				'localhost',
				'seed1.sappcoin.com',
				'seed2.sappcoin.com',
				'seed3.sappcoin.com',
				'seed4.sappcoin.com',
				'seed5.sappcoin.com',
				'seed6.sappcoin.com',
				'seed7.sappcoin.com',
				'seed8.sappcoin.com',
				'seed9.sappcoin.com',
				'seed10.sappcoin.com',
			],
		},
		testnet: {
			name: 'livenet',
			alias: 'mainnet',
			pubkeyhash: 0x8b,
			privatekey: 0xef,
			scripthash: 0x13,
			networkMagic: 0x457665ba,
			port: 46329,
			dnsSeeds: [
				'localhost',
				'seed1.sappcoin.com',
				'seed2.sappcoin.com',
				'seed3.sappcoin.com',
				'seed4.sappcoin.com',
				'seed5.sappcoin.com',
				'seed6.sappcoin.com',
				'seed7.sappcoin.com',
				'seed8.sappcoin.com',
				'seed9.sappcoin.com',
				'seed10.sappcoin.com',
			],
		}
	},
	getAddress: (privkeyWIF, sappNet) => {
		return coins.getAddress(privkeyWIF, sappNet)
	},
	connect: (specs) => {
		Networks.add(specs);
		var coinNet = Networks.get('sapp')
		return coinNet
	},
	disconnect: (coinNet) => {
		Networks.remove(sappNet)
	}
}
  
coins.raven = 
{
	name: process.env.NAME,
	alias: process.env.ALIAS,
	pubkeyhash: 0x3c,
	privatekey: 0x80,
	scripthash: 0x7a,
	networkMagic: 0x5241564e,
	port: 18767,
	dnsSeeds: [
		'localhost',
		'seed-raven.bitactivate.com',
		'seed-raven.ravencoin.com',
		'seed-raven.ravencoin.org'
	],
}
*/