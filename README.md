# Discord Voice Search
The vision is to have discord implement a voice search feature into their voice channels so that players can simply ask discord a question about the game they are currently playing and have the results broadcast into the voice channel that they are in.

## Contribution
Any way you can think of. If you know Node JS, text-to-speech, speech-to-text, or even just want to talk about the project, anything is welcomed. Please feel free to reach out to me.

This project is in the very early stages of life. So far, it has very rudimentary functionality and there is no voice implementation yet. I am fairly new to the world of programming and this is the first oepn source project that I have worked on, let alone launched. This project is definitely out of the scope of my knowledge. I am slowly learning more and more and building what I can in the easiest way possible so that a working prototype can be released but I am making this open source to start a conversation with other people who may be passionate in the vision that I see for the future of gaming where your voice can be leveraged to make the gaming experience better for everyone.

## The Vision
To simplify the process of getting information about a game without the hassle of alt + tabbing and manually searching.

As for why discord should genuinely consider adding this feature to discord, this would mean that discord could become a much bigger part of gaming than just a means of communication with friends. With this feature, people playing singleplayer games will especially want to stay in a voice channel to gain acccess to this feature, meaning more people will use discord and its features like streaming and potentially pay for their premium services. 

## Installation
Universal Project Installation:
1. Download the ZIP file and unzip
2. Open VSCode
3. Open a New Terminal within VSCode and enter `npm install`
5. [Create a discord bot](https://discordpy.readthedocs.io/en/latest/discord.html)
6. Duplicate file "sample_config.json" and rename it to "config.json"
7. Add your bot token in the new config.json fill
8. In the terminal, enter `npm run devStart`

## Usage
Currently, searching is only available through text in a discord channel with the bot added.
Type `!search <search parameters>` and replace "<search parameters>" with what you want to search in google

Currently, the bot uses a headless chromium browser from pupeteer to search google and return the text in google's featured snippets box.

## Current Todos
* Implement Test Driven Development
* Properly parse text search queries and consistently return google search quick results
* Create audio files for the text-to-speech of the google quick results
* Play the audio files automatically within a voice channel in discord
* Convert a voice command into text from within a discord voice channel

## Authors
* [Ryan](https://ryancarr.ca "ryancarr.ca") - Initial Dev 

## License
GNU General Public License v3.0
