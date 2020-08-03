'use strict'

require('dotenv').config()
const level = require('level')
const bitcore = require('@dashevo/dashcore-lib')
const coins = require('./coins')
const BN = bitcore.crypto.BN
const Point = bitcore.crypto.Point
const PrivateKey = bitcore.PrivateKey
const Networks = bitcore.Networks
const Base58Check = bitcore.encoding.Base58Check

var address = coins.sapphire.getAddress(process.env.DEFAULT_SAPP_PRIVKEY_WIF, 'livenet')
coins.saveKeyToDb('saphire', process.env.DEFAULT_SAPP_PRIVKEY_WIF, 'livenet')
console.log(address)

