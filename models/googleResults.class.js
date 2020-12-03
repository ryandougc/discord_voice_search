'use strict';

const puppeteer             = require('puppeteer');     // Puppeteer for making the google search
const gTTS                  = require('gtts');          // Google text-to-speech engine

module.exports = class {
    static async search(searchTerms) {
        const browser = await puppeteer.launch({
            // headless: true,
            args: ['--window-size=1280,720', '--auto-open-devtools-for-tabs'],
        });

        try {
            const page = await browser.newPage();
            await page.goto('http://google.com');
            await page.type('input.gLFyf', searchTerms);
            await page.$eval('input[name=btnK]', el => el.click());
            await page.waitForSelector('.hgKElc');

            const quickResults = await page.$eval('.hgKElc', el => el.textContent);

            return quickResults;
        }
        catch(e) {
            console.log(e);
        }
        finally{
            browser.close();
        }
    }
    static async tts(searchResults){
        let voiceSearchResults = await new gTTS(searchResults, 'en');

        return voiceSearchResults;
    }
};