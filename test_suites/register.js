const using = require('jasmine-data-provider');
const regAlertEmptyDT = require('../test_data/regAlertEmptyDT');
const regAlertInvalidDT = require('../test_data/regAlertInvalidDT');
const regInvalidDT = require('../test_data/regInvalidDT');
const regValidDT = require('../test_data/regValidDT');
const headerPO = require('../page_objects/headerPO');
const registerPO = require('../page_objects/registerPO');
const registerPF = require('../page_functions/registerPF');

describe('Test "Registration" module', () => {
    beforeAll(async () => {
        await browser.get('https://www.bookdoc.com/', 5000);
        await browser.wait(protractor.ExpectedConditions.urlIs('https://www.bookdoc.com/'),
            10000, 'URL: https://www.bookdoc.com/ is not loaded');
    });
    it('Test mandatory fields checking', async () => {
        await headerPO.btnNewAcc.click();
        await browser.wait(protractor.ExpectedConditions.urlIs('https://www.bookdoc.com/registration/'),
            5000, 'Registration page is not loaded');
        await registerPO.btnContinue.click();
        expect(await registerPO.lblAlert.get(0).getText()).toBe(regAlertEmptyDT.email);
        expect(await registerPO.lblAlert.get(1).getText()).toBe(regAlertEmptyDT.pwd);
        expect(await registerPO.lblAlert.get(2).getText()).toBe(regAlertEmptyDT.fname);
        expect(await registerPO.lblAlert.get(3).getText()).toBe(regAlertEmptyDT.lname);
        expect(await registerPO.lblAlert.get(4).getText()).toBe(regAlertEmptyDT.dob);
        expect(await registerPO.lblAlert.get(5).getText()).toBe(regAlertEmptyDT.phone);
        expect(await registerPO.lblAlert.get(6).getText()).toBe(regAlertEmptyDT.tnc);
    });
    using(regInvalidDT, (data, desc) => {
        it('Test invalid fields checking for ' + desc, async () => {
            await registerPO.tfEmail.sendKeys(data.email);
            expect(await registerPO.lblAlert.get(0).getText()).toBe(regAlertInvalidDT.email);
            await registerPO.tfPwd.sendKeys(data.pwd);
            expect(await registerPO.lblAlert.get(1).getText()).toBe(regAlertInvalidDT.pwd);
            await registerPO.tfFname.sendKeys(data.fname);
            expect(await registerPO.lblAlert.get(2).getText()).toBe(regAlertInvalidDT.fname);
            await registerPO.tfLname.sendKeys(data.lname);
            expect(await registerPO.lblAlert.get(3).getText()).toBe(regAlertInvalidDT.lname);
            await registerPO.tfPhone.sendKeys(data.phone);
            expect(await registerPO.lblAlert.get(5).getText()).toBe(regAlertInvalidDT.phone);
            await registerPF.clearFields();
        });
    });
    it('Test invalid Date of Birth checking', async () => {
        const invalidDate = new Date();
        invalidDate.setDate(invalidDate.getDate() + 1);
        invalidDate.setFullYear(invalidDate.getFullYear() - 13);
        expect(await registerPF.selectDOB(invalidDate)).toBeTruthy();
        expect(await registerPO.lblAlert.get(4).getText()).toBe(regAlertInvalidDT.dob);
    });
    debugger
    it('Test valid fields checking', async () => {
        await registerPF.clearFields();
        await registerPF.enterFields(regValidDT.email, regValidDT.pwd, regValidDT.fname, regValidDT.lname,
            regValidDT.dob, regValidDT.phone, regValidDT.sex);
        expect(await registerPO.lblAlert.count()).toEqual(0);
    });
    xit('Test register new account', async () => {
        await registerPO.btnContinue.click();
        await browser.wait(protractor.ExpectedConditions.urlIs('https://www.bookdoc.com/'),
            10000, 'URL: https://www.bookdoc.com/ is not loaded');
        expect(await headerPO.btnLogin.isPresent()).toBeFalsy();
        expect(await headerPO.btnNewAcc.isPresent()).toBeFalsy();
    });
});