const { search } = require('../models/googleResults.class.js');

test('should output google featured snippets text', async () => {
    const searchResults = await search("who plays the voice of woody in toy story");

    expect(searchResults).toBe('Woody, the toy cowboy sheriff, is voiced once again by Academy Award winner Tom Hanks.');
});