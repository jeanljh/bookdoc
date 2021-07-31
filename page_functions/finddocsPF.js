const moment = require('moment');
const finddocsPO = require('../page_objects/finddocsPO');
const commonPF = require('../util_functions/commonPF');
module.exports = new finddocsPF();

const EC = protractor.ExpectedConditions;

function finddocsPF() {
    this.selectServiceList = service => {
        return finddocsPO.lblService.reduce((acc, elm) => {
                if (acc) return acc;
                return elm.getText().then(text => {
                    if (text.localeCompare(service, undefined, {
                            sensitivity: 'base'
                        }) === 0) {
                        return {
                            elm: elm,
                            text: text
                        }
                    }
                });
            })
            .then(result => {
                if (!result) throw `Error: Input value (${service}) does not match with list of options`;
                result.elm.click();
                return result.text;
            });
    }
    this.selectServiceList2 = async input => {
        for (let i = 0; i < await finddocsPO.lblService.count(); i++) {
            let elm = finddocsPO.lblService.get(i);
            let text = await elm.getText();
            if (text.localeCompare(input, undefined, {
                    sensitivity: 'base'
                }) === 0) {
                elm.click();
                return text;
                // return { 
                //     text: text,
                //     match: true
                // };
            }
        }
        return `Error: Input value (${input}) does not match with list of options`;
        // return Promise.reject().then().catch(() =>
        //     `Error: Input value (${input}) does not match with list of options`);
        // return {
        //     match: false
        // };
    }
    this.selectServiceList3 = async service => {
        let output = await finddocsPO.lblService.reduce((acc, elm) => {
            if (acc) return acc;
            return elm.getText().then(text => {
                if (text.localeCompare(service, undefined, { sensitivity: 'base' }) === 0) {
                    elm.click();
                    return text;
                }
            });
        });
        if (!output) {
            await finddocsPO.lnkFullList.click();
            await browser.wait(protractor.ExpectedConditions.invisibilityOf(finddocsPO.lnkFullList),
                 3000, 'View full list link is still displayed after expanding the list');
            output = await finddocsPO.lblFullService.reduce((acc, elm) => {
                    if (acc) return acc;
                    return elm.getText().then(text => {
                        if (text.localeCompare(service, undefined, { sensitivity: 'base' }) === 0) {
                            elm.click();
                            return text;
                        }
                    });
                })
        }
        return output;
    }
    this.valSearchResult = input => {
        return finddocsPO.lblSearchTag.filter((elm, idx) => {
            return elm.getText().then(text => {
                if (text.localeCompare(input, undefined, {
                        sensitivity: 'base'
                    }) !== 0) {
                    return idx;
                }
            });
        });
    }
    this.selectLocation = input => {
        return finddocsPO.lblLocation.reduce((acc, elm, idx) => {
            if (acc) return acc;
            return elm.getText().then(text => {
                if (text.localeCompare(input, undefined, {
                        sensitivity: 'base'
                    }) === 0) {
                    elm.click();
                    return true;
                }
            });
        }).then(output => {
            if (!output) throw `Error: Input value (${input}) does not match with list of options`;
        });
    }
    this.selectDatePicker = async date => {
        const today = new Date();
        const maxDate = today.setFullYear(today.getFullYear() + 1);
        if (date > maxDate) {
            console.log('Input date ' + date.toLocaleDateString() +
                ' must not exceed max allowed date ' + moment().add(1, 'years').calendar());
            return false;
        }
        if (date < new Date()) {
            console.log(`Input date (${date.toDateString()}) must be today (${new Date().toDateString()}) and onwards`);
            return false;
        }
        while (true) {
            const curDate = new Date(await finddocsPO.lblHeader.getText());
            const curMM = curDate.getMonth();
            const curYY = curDate.getYear();
            if (date.getYear() < curYY) finddocsPO.btnPrevMonth.click();
            else if (date.getYear() > curYY) finddocsPO.btnNextMonth.click();
            else if (date.getMonth() < curMM) finddocsPO.btnPrevMonth.click();
            else if (date.getMonth() > curMM) finddocsPO.btnNextMonth.click();
            else break;
            await browser.sleep(300);
        }
        await browser.sleep(500);
        // await finddocsPO.lblDay.get(date.getDate() - 1).click().then()
        //     .catch(() => {
        //         console.log(`Day picker for day ${date.getDate()} is not clickable`);
        //         return false;
        //     });
        const hasSelectDate =  await finddocsPO.lblDay.reduce((acc, elm) => {
            const formatDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString(); 
            if(acc) return acc;
            return elm.getText().then(text => {
                if (text === formatDate) {
                    elm.click();
                    return true;
                }
            });
        }).then().catch();

        if (!hasSelectDate) {
            console.log(`Day picker for day ${date.getDate()} is not clickable`);
            return false;
        }

        await browser.wait(EC.invisibilityOf(finddocsPO.ddlDatePicker),
            2000, 'Date picker is still visible');
        const actDate = await finddocsPO.tfSearch.get(2).getAttribute('value');
        const expDate = commonPF.formatDate(date, '/');
        if (actDate !== expDate) {
            console.log(`Actual: ${actDate} | Expect: ${expDate}`);
            return false;
        }
        return true;
    }
}