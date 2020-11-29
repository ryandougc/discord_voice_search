'use strict';

// require the discord.js module
const Discord = require('discord.js');

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
                const searchResults = await GoogleResults.launchBrowser(searchTerms);

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