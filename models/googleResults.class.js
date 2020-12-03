'use strict';

const puppeteer = require('puppeteer');

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
            console.log(quickResults);

            return quickResults;
        }
        catch(e) {
            console.log(e);
        }
        finally{
            browser.close();
        }
    }
};