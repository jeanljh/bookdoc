const registerPO = require('../page_objects/registerPO');
const commonPF = require('../util_functions/commonPF');

module.exports = new registerPF();

function registerPF() {
    this.enterFields = async function (email, pwd, fname, lname, dob, phone, sex) {
        await registerPO.tfEmail.sendKeys(email);
        await registerPO.tfPwd.sendKeys(pwd);
        await registerPO.tfFname.sendKeys(fname);
        await registerPO.tfLname.sendKeys(lname);
        await this.selectDOB(dob);
        if (sex) {
            if (sex.localeCompare('male', undefined, {
                    sensitivity: 'base'
                }) === 0) {
                await registerPO.ckbMale.click();
            } else if (sex.localeCompare('female', undefined, {
                    sensitivity: 'base'
                }) === 0) {
                await registerPO.ckbFemale.click();
            }
        }
        await registerPO.tfPhone.sendKeys(phone);
        await registerPO.ckbTnc.click();
    }
    this.selectDOB = async date => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;

        await registerPO.cbbDob.get(0).click();
        let output = await commonPF.selectFromElmArray(registerPO.ddlDay, day.toString());
        if (!output) {
            console.log(`Input day (${day}) does not match with "Day" drop down list values`);
            return false;
        }
        output = await commonPF.selectFromElmArray(registerPO.ddlMonth, month.toString());
        if (!output) {
            console.log(`Input month (${month}) does not match with "Month" drop down list values`);
            return false;
        }
        output = await commonPF.selectFromElmArray(registerPO.ddlYear, year.toString());
        if (!output) {
            console.log(`Input year (${year}) does not match with "Year" drop down list values`);
            return false;
        }
        return true;
    }
    this.clearFields = async () => {
        await registerPO.tfEmail.clear();
        await registerPO.tfPwd.clear();
        await registerPO.tfFname.clear();
        await registerPO.tfLname.clear();
        await registerPO.tfPhone.clear();
    }
}