const fs                        = require('fs');            // Node Filesystem
const Gtts                      = require('gtts');          // Google text-to-speech

const tmpPath                   = "./tmp/";                                                 // Audio file temporary folder location
const audioFileName             = Math.floor(Math.random() * 1000000000).toString();        // Audio file random, unique-ish, naming scheme

module.exports = class {

}