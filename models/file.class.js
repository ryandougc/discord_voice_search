'use strict';

const fs                    = require('fs');            // Node Filesystem
const path                  = require('path');          // Node Path utilities

const tmpPath               = "./tmp/";                 // Temporary file folder path

module.exports = class {
    constructor (
        extension,
        message
    ){
        this.dirPath = tmpPath;
        this.fileName = Math.floor(Math.random() * 1000000000).toString();
        this.extension = extension;
        this.fullName = `${this.dirPath}${this.fileName}${this.extension}`;
        this.message = message;
    }

    static async createTmp() {
        fs.mkdirSync(tmpPath);
    }

    static async clearTmp() {
        // Source: https://stackoverflow.com/questions/27072866/how-to-remove-all-files-from-directory-without-removing-directory-in-node-js
        fs.readdir(tmpPath, async (err, files) => {
            if (err) throw err;

            for (const file of files) {
                await fs.unlink(path.join(tmpPath, file), err => {
                    if (err) throw err;
                });
            }
        });
    }

    static async initTmp() {
        if(fs.existsSync(tmpPath)){
            await this.clearTmp();
        } else {
            await this.createTmp();
        }
    }

    async saveFile(voiceSearchResults) {
        await voiceSearchResults.save(this.fullName, (err) => {
            if(err) throw new Error(err);

            // Confirmation for dev that the file was saved successfully
            console.log(`Success! Open file ${this.fullName} to hear result.`);
        });
    }

    async playAudioFile() {
        // Make bot join the voice channel that the author of the message is in
        const connection = await this.message.member.voice.channel.join();

        // Make bot play audio file in the voice channel
        const dispatcher = await connection.play(this.fullName, {
            volume: 0.65,
        });
    }
}