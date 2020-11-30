'use strict';

const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// require google TTS
const gTTS = require('gtts');

// create a new Discord client
const client = new Discord.Client();

const { prefix, token } = require('./config.json');

// Import bot modules
const GoogleResults = require('./googleResults.class.js');

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', async message => {
    if (message.author.username === 'Test-Bot'){
        return;
    }else {
        // Seperate command words
        const commandFormat = /^!\w+/;
        const searchTermsFormat = /\s(.*)$/;

        const command = (message.content.match(commandFormat))[0];
        let searchTerms = null;

        if (message.content.match(searchTermsFormat)) {
            searchTerms = message.content.match(searchTermsFormat)[1];
        }

        console.log(`Command: ${command}`);
        console.log(`Search Terms: ${searchTerms}`);

        // Google Search
        if (command === `${prefix}search`) {
            try{
                const audioFileName = Math.floor(Math.random() * 1000000000).toString();
                const tmpPath = "./tmp/";

                const searchResults = await GoogleResults.launchBrowser(searchTerms);

                let voiceSearchResults = new gTTS(searchResults, 'en');

                if(!fs.existsSync(tmpPath)){
                    fs.mkdirSync(tmpPath);
                }

                voiceSearchResults.save(`./tmp/${audioFileName}.mp3`, async (err, result) => {
                    if(err) throw new Error(err)
                    console.log(`Success! Open file ./tmp/${audioFileName}.mp3 to hear result.`);

                    // Make bot join voice chat
                    const connection = await message.member.voice.channel.join();

                    // Make bot play audio file
                    const dispatcher = connection.play(`./tmp/${audioFileName}.mp3`, {
                        volume: 0.5,
                      });

                })

                message.channel.send(searchResults);
            }
            catch(e) {
                console.log(e);
            }
        }

        // Create an event listener for new guild members
        client.on('guildMemberAdd', member => {
            // Send the message to a designated channel on a server:
            const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
            // Do nothing if the channel wasn't found on this server
            if (!channel) return;
            // Send the message, mentioning the member
            channel.send(`Welcome to the server, ${member}`);
        });
    }
});

client.login(token);