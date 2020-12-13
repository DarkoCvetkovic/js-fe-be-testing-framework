require('chromedriver');
const url = ('http://www.seleniumframework.com/Practiceform/');
const assert = require('assert');
const path = require('path');
const { Builder, By, Key, until } = require('selenium-webdriver');
const FormObject = require('./pageObjects/formObject');
const FrontendHelper = require('./frontendHelper/frontendHelper');
const chrome = require('selenium-webdriver/chrome');

let chromeCapabilities = new chrome.Options();
chromeCapabilities.addArguments('disable-infobars');
chromeCapabilities.addArguments('start-maximized');

describe('UI Automated Test', () => {
    let driver;

    beforeEach(async function () {
        driver = await new Builder().withCapabilities(chromeCapabilities).build();
        await driver.get(url);
    });

    afterEach(() => driver.quit());

    it('Fill and submit “Contact us” form', async () => {

        // Using Page Objects
        const formPage = new FormObject(driver);
        await formPage.submitForm(driver);
    });

    it('Assert “JAVA SCRIPT ALERT” box', async () => {
        await driver.findElement(By.css("button[onclick='newAlert()']")).click();

        var expectedAlertMessage = "Please share this website with your friends and in your organization.";
        let alert = await driver.switchTo().alert();
        var actualAlertMessage = await alert.getText();

        // Using Assertion
        assert.strictEqual(expectedAlertMessage, actualAlertMessage);
        alert.accept();
    });

    it('Assert New Message Window', async () => {

        // Make sure we dont have one window open already
        const mainWindow = await driver.getWindowHandle();
        assert((await driver.getAllWindowHandles()).length === 1);

        await driver.findElement(By.css("button[onclick='newMsgWin()']")).click();

        // Wait for the new window
        await driver.wait(
            async () => (await driver.getAllWindowHandles()).length === 2, 5000);

        const windows = await driver.getAllWindowHandles();

        //Loop po find new window
        windows.forEach(async handle => {
            if (handle !== mainWindow) {
                await driver.switchTo().window(handle);
            }
        });
        await driver.switchTo().window(mainWindow);
        await driver.wait(until.titleIs('Selenium Framework | Practiceform'), 5000);
    });

    it('Take a screenshot of entire page', async () => {
        const helper = new FrontendHelper(driver);
        await helper.takeScreenshot(driver, path.join('screenshots', 'HomePage.png'));
    });

    it('Assert “Selenium” element', async () => {
        const element = await driver.findElement(By.partialLinkText('SELENIUM'));
        assert.notStrictEqual(element, null)
    });
})

