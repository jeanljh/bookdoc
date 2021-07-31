const searchResultPO = require('../page_objects/searchResultPO');

module.exports = new searchResultPF();

function searchResultPF() {
    this.valSpecialtyBeta = input => {
        let page = 1;
        let misMatch = false;
        while (true) {
            let valOutput = searchResultPO.lblSpecialty.reduce((acc, elm, idx) => {
                if (acc) return acc;
                return elm.getText().then(text => {
                    if (text.localeCompare(input, undefined, {
                        sensitivity: 'base'
                    }) === 0) {
                        return {
                            text: text,
                            idx: idx + 1
                        }
                    }
                }).then(output => {
                    if (!output) return true;
                    console.log(`Mismatch result on page ${page} and row ${output.idx}: ` +
                        `Actual = ${output.text} | Expect = ${input}`);
                    return false;
                });
            });
            if (!valOutput) {
                misMatch = true;
                break;
            }
            if (searchResultPO.btnNext.isEnabled().then(flag => {
                if (flag) {
                    searchResultPO.btnNext.click();
                    page++;
                    return true;
                } else return false;
            }))
                break;
        }
        return misMatch ? false : true;
    }
    this.valLocSpecialty = async (location, specialty) => {
        let page = 1;
        let flag;
        let actResult;
        while (true) {
            try {
                actResult = await searchResultPO.lblLocation.getText();
            } catch (error) {
                break;
            }
            if (actResult.localeCompare(location, undefined, { sensitivity: 'base' }) !== 0) {
                console.log(`Mismatch result on page ${page}: Actual = ${actResult} | Expect = ${location}`);
                // flag = false;
                // break;
                return false;
            }
            for (let i = 0; i < await searchResultPO.lblSpecialty.count(); i++) {
                flag = false;
                for (let j = 0; j < await searchResultPO.lblSpecialty.get(i).$$('li span').count(); j++) {
                    actResult = await searchResultPO.lblSpecialty.get(i).$$('li span').get(j).getText();
                    if (actResult.localeCompare(specialty, undefined, { sensitivity: 'base' }) === 0) {
                        flag = true;
                        break;
                    }
                }
                if (flag === false) {
                    actResult = await searchResultPO.lblSpecialty.get(i).$$('li span').map(val => val.getText());
                    console.log(`Mismatch result on page ${page} / row ${i + 1}: ` +
                        `Input value (${specialty}) does not match with list of specialties (${actResult})`);
                    // break;
                    return false;
                }
            }
            // if (flag === false) break;
            try {
                // await searchResultPO.btnNext.isDisplayed();
                await searchResultPO.btnNext.click();
            } catch (error) {
                break;
            }
            page++;
        }
        // return flag;
        return page > 1 ? true : 'Empty search result';
    }
}