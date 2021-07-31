const headerPO = require('../page_objects/headerPO');
const loginPO = require('../page_objects/loginPO');
const loginAlertEmptyDT = require('../test_data/loginAlertEmptyDT');
const loginValidDT = require('../test_data/loginValidDT');
const loginPF = require('../page_functions/loginPF');
const ec = protractor.ExpectedConditions;

describe('Test "Login" module', () => {
    beforeAll(async () => {
        await browser.get('https://www.bookdoc.com/');
        await browser.wait(ec.urlIs('https://www.bookdoc.com/'), 10000, 'BookDoc website is not loaded');
    });
    it('Test mandatory fields checking', async () => {
        await headerPO.btnLogin.click();
        await browser.wait(ec.urlIs('https://www.bookdoc.com/login/'), 5000, 'Login page is not loaded');
        await loginPO.btnLogin.click();
        expect(await loginPO.lblAlert.get(0).getText()).toBe(loginAlertEmptyDT.email);
        expect(await loginPO.lblAlert.get(1).getText()).toBe(loginAlertEmptyDT.pwd);
    });
    it('Test show / hide password', async () => {
        await loginPO.tfPwd.sendKeys(loginValidDT.pwd);
        expect(await loginPO.tfPwd.getAttribute('value')).toBe(loginValidDT.pwd);
        await loginPO.btnShowPwd.click();
        expect(await loginPO.tfPwd.getAttribute('value')).toBe(loginValidDT.pwd);
        await loginPO.btnShowPwd.click();
        expect(await loginPO.tfPwd.getAttribute('value')).toBe(loginValidDT.pwd);
        await loginPF.clearFields();
    });
    it('Test all links redirect to their URLs respectively', async () => {
        await loginPO.lnkForgotPwd.click();
        await browser.wait(ec.urlIs('https://www.bookdoc.com/reset-password/'),
            5000, 'Reset password page is not loaded');
        await browser.navigate().back();

        await loginPO.lnkTerms.click();
        let winTab = await browser.getAllWindowHandles();
        await browser.switchTo().window(winTab[1]);
        expect(await browser.getCurrentUrl()).toBe('https://www.bookdoc.com/terms/');
        await browser.close();
        await browser.switchTo().window(winTab[0]);

        await loginPO.lnkPrivacy.click();
        winTab = await browser.getAllWindowHandles();
        await browser.switchTo().window(winTab[1]);
        expect(await browser.getCurrentUrl()).toBe('https://www.bookdoc.com/privacy/');
        await browser.close();
        await browser.switchTo().window(winTab[0]);

        await loginPO.btnFB.click();
        await browser.waitForAngularEnabled(false);
        winTab = await browser.getAllWindowHandles();
        await browser.switchTo().window(winTab[1]);
        expect(await browser.getCurrentUrl()).toContain('https://www.facebook.com/login');
        await browser.close();

        await browser.switchTo().window(winTab[0]);
        await browser.waitForAngularEnabled(true);
        await browser.wait(ec.elementToBeClickable(loginPO.btnFBPopupOK),
            3000, 'Facebook not created alert popup button is not clickable');
        await loginPO.btnFBPopupOK.click();
        await loginPO.btnNewAcc.click();
        await browser.wait(ec.urlIs('https://www.bookdoc.com/registration/'),
            5000, 'Register new account page is not loaded');
        await browser.navigate().back();
    });
});