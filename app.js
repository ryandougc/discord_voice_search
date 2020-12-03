'use strict';

const Discord               = require('discord.js');    // Discord JS
const { prefix, token }     = require('./config.json'); // Discord JS Bot auth details

let currentSearchResults    = null;
let lastSearchResults       = null;

// Initiate Discord client
const client = new Discord.Client();

// Import bot modules
const File                      = require('./models/file.class.js');
const GoogleResults             = require('./models/googleResults.class.js');
const Message                   = require('./models/message.class.js');

// If the temporary folder exists, clear it. If it doesn't exist, make a new one
File.initTmp();

// Confirmation for dev that the bot is initiated properly
client.once('ready', () => {
    console.log('Ready!');
});

// Event listener for user submitted text commands
client.on('message', async message => {
    // If a message is sent by the bot, exit this event listener
    if (message.author.username === 'Test-Bot') return;

    // If a message doesn't start with the command prefix, exit this event
    if (!message.content.match(/^!/)) return;

    // Split a command message into the command and the search terms
    const [command, searchTerms] = await Message.splitCommand(message);

    // Google Search
    if (command === `${prefix}search` && searchTerms !== null) {
        try{
            // Search google for searchTerms
            const searchResults = await GoogleResults.search(searchTerms);

            // Convert searchReults into a voice audio file
            let voiceSearchResults = await GoogleResults.tts(searchResults);

            // Create a new audio file
            const audioFile = await new File('.mp3', message);

            // Save the audio file
            await audioFile.saveFile(voiceSearchResults);

            // Play the audio file
            await audioFile.playAudioFile();

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