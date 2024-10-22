const { By } = require("selenium-webdriver/lib/by");
const { Key } = require("selenium-webdriver/lib/input");

function randomString(length, chars) {
    var mask = '';
    if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
    if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (chars.indexOf('#') > -1) mask += '0123456789';
    if (chars.indexOf('!') > -1) mask += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
    var result = '';
    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    return result;
}

class FormObject {
    constructor(driver) {
        this.driver = driver;
    }

    async submitForm() {
        await this.driver.findElement(By.name('name')).sendKeys('Darko');
        await this.driver.findElement(By.name('email')).sendKeys('example@gmail.com');
        await this.driver.findElement(By.name('telephone')).sendKeys('+381 63 111111');
        await this.driver.findElement(By.name('country')).sendKeys('Serbia');
        await this.driver.findElement(By.name('company')).sendKeys('CT');
        await this.driver.findElement(By.name("message")).sendKeys(randomString(64, '#A!'));
        await this.driver.findElement(By.partialLinkText('Submit')).click();  
    }
}

module.exports = FormObject;