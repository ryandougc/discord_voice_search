'use strict';

module.exports = class {
    // Function to split a message into the command and the optional search terms
    static async splitCommand(message){
        // Create regex for the command prefix, command and search terms
        const commandFormat         = /^!\w+/;
        const searchTermsFormat     = /^!search\s(.*)$/;
        let command                 = null;
        let searchTerms             = null;

        // Match message to the commandFormat regex and extract the command from the message
        command = (message.content.match(commandFormat))[0];
        console.log(`Command: ${command}`);

        if (!message.content.match(/^!search\s\w+/)) return [command, null];

        // If the command matches the searchTermsFormat, extract the search terms from the message
        if (message.content.match(searchTermsFormat)[1]) {
            searchTerms = message.content.match(searchTermsFormat)[1];
            console.log(`Search Terms: ${searchTerms}`);
        }

        return [command, searchTerms];
    }
};