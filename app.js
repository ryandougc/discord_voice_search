'use strict';

const fs                        = require('fs');            // Node Filesystem
const Discord                   = require('discord.js');    // Discord JS
const Gtts                      = require('gtts');          // Google text-to-speech
const { prefix, token }         = require('./config.json'); // Discord JS Bot auth details

let currentSearchResults    = null;
let lastSearchResults       = null;

// Initiate Discord client
const client = new Discord.Client();

// Import bot modules
const GoogleResults             = require('./models/googleResults.class.js');
// const TextToSpeech           = require('./models/textToSpeech.class.js');

// Confirmation for dev that the bot is initiated properly
client.once('ready', () => {
    console.log('Ready!');
});

// Event listener for user submitted text commands
client.on('message', async message => {
    // If a message is sent by the bot, exit this event listener
    if (message.author.username === 'Test-Bot') return;

    // Create regex for the command prefix, command and search terms
    const prefixRegex           = /^!/;
    const commandFormat         = /^!\w+/;
    const searchTermsFormat     = /^!search\s(.*)$/;
    let searchTerms             = null;

    // If a message doesn't start with the command prefix, exit this event
    if (!message.content.match(prefixRegex)) return;

    // Match message to the commandFormat regex and extract the command from the message
    const command = (message.content.match(commandFormat))[0];
    console.log(`Command: ${command}`);

    // If the command matches the searchTermsFormat, extract the search terms from the message
    if (message.content.match(searchTermsFormat)) {
        searchTerms = message.content.match(searchTermsFormat)[1];
        console.log(`Search Terms: ${searchTerms}`);
    }

    const tmpPath               = "./tmp/";                                                 // Audio file temporary folder location
    const audioFileName         = Math.floor(Math.random() * 1000000000).toString();        // Audio file random, unique-ish, naming scheme
    const audioFileType         = ".mp3";                                                   // Audio file type/extension
    const audioFile             = `${tmpPath}${audioFileName}${audioFileType}`;             // Complete audio file path from root folder

    // Google Search
    if (command === `${prefix}search`) {
        try{
            // Search google for searchTerms
            const searchResults = await GoogleResults.search(searchTerms);

            // Convert searchReults into a voice audio file
            let voiceSearchResults = new Gtts(searchResults, 'en');

            // Create the temporary uadio file storage folder if it doesn't already exist
            if(!fs.existsSync(tmpPath)){
                fs.mkdirSync(tmpPath);
            }

            // Save the audio file
            voiceSearchResults.save(audioFile, async (err, result) => {
                if(err) throw new Error(err)

                // Confirmation for dev that the file was saved successfully
                console.log(`Success! Open file ${audioFile} to hear result.`);

                // Make bot join the voice channel that the author of the message is in
                const connection = await message.member.voice.channel.join();

                // Make bot play audio file in the voice channel
                const dispatcher = connection.play(audioFile, {
                    volume: 0.65,
                });

            })

            // Keep track of last search results in text
            lastSearchResults = currentSearchResults;
            currentSearchResults = searchResults;

            // Make bot send the searchResults text as a message
            message.channel.send(searchResults);
        }
        catch(e) {
            console.log(e);
        }
    }
});

// Event listener for new guild members - straight from discord.js docs
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
    // Do nothing if the channel wasn't found on this server
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
});

// Authenticate the bot
client.login(token);