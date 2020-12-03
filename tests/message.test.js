/**
 * @jest-environment node
 */

const message = {
    content: '!search who plays the voice of woody in toy story'
}

const { splitCommand } = require('../models/message.class.js');

test('should output a command and search terms', async () => {
    const [command, searchResults] = await splitCommand(message);

    expect(command).toBe('!search');
    expect(searchResults).toBe('who plays the voice of woody in toy story');
})