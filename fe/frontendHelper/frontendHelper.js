const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

class FrontendHelper {
  constructor(driver) {
    this.driver = driver;
  }

  async takeScreenshot(driver, file) {
    let image = await driver.takeScreenshot();
    await writeFile(file, image, 'base64');
  }

}

module.exports = FrontendHelper;