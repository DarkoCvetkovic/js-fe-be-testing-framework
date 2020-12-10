require('chromedriver');
const url = ('http://www.seleniumframework.com/Practiceform/');
const assert = require('assert');
const path = require('path');
const { Builder, By, Key, until } = require('selenium-webdriver');
const FormObject = require('./pageObjects/formObject');
const FrontendHelper = require('./frontendHelper/frontendHelper');

var capabilities = {
    'browserName' : 'chrome',
    'chromeOptions' : {
      'args' : [
          "--disable-plugins",
          "--window-size=1920x1080",
          "--headless"
    ]
    }
}

describe('UI Automated Test', () => {
    let driver;
    
    beforeEach(async () => {
        driver = await new Builder().withCapabilities(capabilities).build();    
        await driver.get(url);    
        // driver.manage().window().maximize();
    });

    afterEach(async () => driver.quit());

    it('Fill and submit “Contact us” form', async () => {       
        
        // Using Page Objects
        const formPage = new FormObject(driver);
        await formPage.submitForm(driver);     
    });

    xit('Assert “JAVA SCRIPT ALERT” box', async () => {        
        
        await driver.findElement(By.css("button[onclick='newAlert()']")).click();

        var expectedAlertMessage = "Please share this website with your friends and in your organization.";
        let alert = await driver.switchTo().alert();
        var actualAlertMessage = await alert.getText();
        
        // Using Assertion
        assert.strictEqual(expectedAlertMessage, actualAlertMessage);
        alert.accept();     
    });

    xit('Assert New Message Window', async () => {  

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

    xit('Take a screenshot of entire page', async () => { 
        const helper = new FrontendHelper(driver);
        await helper.takeScreenshot(driver, path.join('screenshots', 'HomePage.png'));
    });
})

