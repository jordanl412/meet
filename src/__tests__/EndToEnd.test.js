import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
    let browser;
    let page;
    beforeAll(async () => {
        //jest.setTimeout(80000);
        browser = await puppeteer.launch({
            //headless: false,
            //slowMo: 250,
            //ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    }, 100000);

    afterAll(() => {
        browser.close();
    })

    test('An event element is collapsed by default', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-button');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    test('User can collapse an event to hide its details', async () => {
        await page.click('.event .details-button');
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeNull();
    });

});

describe('Filter events by city', () => {
    let browser;
    let page;
    beforeAll(async () => {
        //jest.setTimeout(80000);
        browser = await puppeteer.launch({
            //headless: false,
            //slowMo: 250,
            //ignoreDefaultArgs: ['--disable-extensions']
        });
        page = await browser.newPage();
        await page.goto('http://localhost:3000/');
        await page.waitForSelector('.event');
    }, 100000);

    afterAll(() => {
        browser.close();
    });

    test('When user hasn\'t searched for a city, show upcoming events from all cities', async () => {
        const eventDetails = await page.$('.event .details');
        expect(eventDetails).toBeDefined();
    });

    test('User should see a list of suggestions when they search for a city', async () => {
        const CitySearch = await page.$('.suggestions li');
        expect(CitySearch).toBeDefined();
    });

    test('User can select a city from the suggested list', async () => {
        await page.reload();
        await page.type('.city', 'Berlin', { delay: 100 });
        await page.click('.suggestions li');
        const selectCity = await page.$$eval('.event', (element) => element.length);
        expect(selectCity).toBe(1);
    });
});