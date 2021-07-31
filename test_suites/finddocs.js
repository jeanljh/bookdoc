// import { browser } from "protractor";
// import { protractor as proc } from "protractor/built/ptor";
const using = require('jasmine-data-provider');
const commonPF = require('../util_functions/commonPF');
const finddocsPF = require('../page_functions/finddocsPF');
const searchResulftPF = require('../page_functions/searchResultPF');
const finddocsPO = require('../page_objects/finddocsPO');
const searchResultPO = require('../page_objects/searchResultPO');
const finddocsDT = require('../test_data/finddocsDT');

describe('Test "Find Healthcare Professionals" module', () => {
    beforeEach(async () => {
        await browser.get('https://www.bookdoc.com/', 5000);
        await browser.wait(protractor.ExpectedConditions.urlIs('https://www.bookdoc.com/'),
            10000, 'URL: https://www.bookdoc.com/ is not loaded');
    });
    // it('Test default state for fields, button and date', () => {
    //     expect(finddocsPO.tfSearch.get(0).getAttribute('placeholder')).toBe('Specialty, Service, Doctor, Clinic, etc.');
    //     expect(finddocsPO.tfSearch.get(1).getAttribute('placeholder')).toBe('Current Location');
    //     expect(finddocsPO.tfSearch.get(2).getAttribute('placeholder')).toBe('Select a Date');
    //     expect(finddocsPO.tfSearch.get(2).getAttribute('value')).toEqual(commonPF.formatDate(new Date(), '/'));

    //     expect(finddocsPO.tfSearch.get(0).isEnabled()).toBeTruthy();
    //     expect(finddocsPO.tfSearch.get(1).isEnabled()).toBeTruthy();
    //     expect(finddocsPO.tfSearch.get(2).isEnabled()).toBeTruthy();
    //     expect(finddocsPO.btnSearch.isEnabled()).toBeFalsy();
    //     expect(finddocsPO.lnkRegister.isEnabled()).toBeTruthy();

    //     finddocsPO.tfSearch.get(2).click();
    //     Promise.all([
    //         finddocsPO.lblCurrentDay.getText(),
    //         finddocsPO.lblHeader.getText()
    //     ])
    //     .then(text => {
    //         expect(new Date(`${text[0]} ${text[1]}`).toDateString()).toBe(new Date().toDateString());
    //     });

    //     finddocsPO.lnkRegister.click();
    //     expect(browser.getCurrentUrl()).toBe('https://www.bookdoc.com/registration/');
    // });

    it('Test default state for fields, button and date with async/await', async () => {
        expect(await finddocsPO.tfSearch.get(0).getAttribute('placeholder')).toBe('Specialty, Service, Doctor, Clinic, etc.');
        expect(await finddocsPO.tfSearch.get(1).getAttribute('placeholder')).toBe('Current Location');
        expect(await finddocsPO.tfSearch.get(2).getAttribute('placeholder')).toBe('Select a Date');
        expect(await finddocsPO.tfSearch.get(2).getAttribute('value')).toEqual(commonPF.formatDate(new Date(), '/'));

        expect(await finddocsPO.tfSearch.get(0).isEnabled()).toBeTruthy();
        expect(await finddocsPO.tfSearch.get(1).isEnabled()).toBeTruthy();
        expect(await finddocsPO.tfSearch.get(2).isEnabled()).toBeTruthy();
        expect(await finddocsPO.btnSearch.isEnabled()).toBeFalsy();
        expect(await finddocsPO.lnkRegister.isEnabled()).toBeTruthy();

        await finddocsPO.tfSearch.get(2).click();
        let currDD = await finddocsPO.lblCurrentDay.getText();
        let currMMYY = await finddocsPO.lblHeader.getText();

        expect(new Date(`${currDD} ${currMMYY}`).toDateString()).toMatch(new Date().toDateString());

        await finddocsPO.lnkRegister.click();
        expect(await browser.getCurrentUrl()).toBe('https://www.bookdoc.com/registration/');
    });

    it('Test select service, location and date from the lists of given options', async () => {
        let dataService = 'Pharmacy';
        await finddocsPO.tfSearch.get(0).click();
        let totalOptions = await finddocsPO.lblService.count();
        await finddocsPO.lblService.get(commonPF.getRandomNumExMax(totalOptions)).click();
        // await browser.wait(protractor.ExpectedConditions.invisibilityOf(finddocsPO.ddlService),
        //     2000, 'Service drop down list is still visible');

        await finddocsPO.tfSearch.get(0).click();
        let selectedOption = await finddocsPF.selectServiceList3(dataService);
        // let selectedOption = await finddocsPF.selectServiceList2(dataService);
        // expect(selectedOption).toBe(dataService);
        // element(by.cssContainingText('.item-content.ng-binding', dataService)).click();
        // await browser.wait(protractor.ExpectedConditions.invisibilityOf(finddocsPO.ddlService),
        //     2000, 'Service drop down list is still visible');

        let shownOption = await finddocsPO.tfSearch.get(0).getAttribute('value');
        expect(selectedOption).toEqual(shownOption);

        await finddocsPO.tfSearch.get(0).clear();
        expect(await finddocsPO.tfSearch.get(0).getAttribute('value')).toBe('');

        await finddocsPO.tfSearch.get(0).sendKeys(dataService);
        await browser.wait(protractor.ExpectedConditions.visibilityOf(finddocsPO.ddlServiceSearch),
            2000, 'Service search result drop down list is not visible');
        expect(await finddocsPF.valSearchResult(dataService).count()).toEqual(0);
        await finddocsPO.tfSearch.get(0).clear();

        await finddocsPO.tfSearch.get(0).click();
        await finddocsPO.tfSearch.get(0).click();
        expect(await finddocsPO.lnkFullList.getText()).toBe('View full list of healthcare professionals');
        await finddocsPO.lnkFullList.click();
        await browser.wait(protractor.ExpectedConditions.invisibilityOf(finddocsPO.lnkFullList),
            3000, 'View full list link is still displayed after expanding the list');
        expect(await finddocsPO.lblService.count()).toBeGreaterThan(totalOptions);
    });
    it('Test date selection features', async () => {
        const date = new Date('1 Jan 2020');
        await finddocsPO.tfSearch.get(2).click();
        expect(await finddocsPF.selectDatePicker(date)).toBeTruthy();
    });
    it('Test location search field features', async () => {
        await finddocsPO.tfSearch.get(1).click();
        await browser.wait(protractor.ExpectedConditions.visibilityOf(finddocsPO.ddlLocation),
            2000, 'Location drop down list is not visible');
        let testData = ['Current Location', 'Malaysia', 'Singapore', 'Hong Kong', 'Thailand'];
        expect(await commonPF.getElementText(finddocsPO.lblLocation)).toEqual(testData);
        testData = 'thailand';
        await finddocsPF.selectLocation(testData);
        const actResult = await finddocsPO.tfSearch.get(1).getAttribute('value');
        expect(`${actResult}`.toLowerCase()).toBe(testData.toLowerCase());
    });
    // const finddocsDT = {
    //         data1: {dtSpecialty: 'Urology', dtLocation: 'Malaysia', dtDate: new Date('1 Feb 2019')},
    //         data2: {dtSpecialty: 'Dermatology', dtLocation: 'Singapore', dtDate: new Date('1 Mar 2019')},
    //         data3: {dtSpecialty: 'Gynae(Oncology)', dtLocation: 'Hong Kong', dtDate: new Date('1 July 2019')}            
    // }
    using(finddocsDT, async (data, desc) => {
        it('Test search result features ' + desc, async () => {
            const dataSpecialty = 'Gynae(Oncology)';
            const dataLocation = 'Hong Kong';
            const dataDate = new Date('1 July 2019');
            
            await finddocsPO.tfSearch.get(0).click();
            await browser.wait(protractor.ExpectedConditions.visibilityOf(finddocsPO.ddlService),
                2000, 'Specialty drop down list is still invisible');
            await finddocsPF.selectServiceList3(data.dtSpecialty);
            await browser.wait(protractor.ExpectedConditions.visibilityOf(finddocsPO.ddlLocation),
                2000, 'Location drop down list is still invisible');
            await finddocsPF.selectLocation(data.dtLocation);
            await browser.wait(protractor.ExpectedConditions.visibilityOf(finddocsPO.ddlDatePicker),
                2000, 'Date picker drop down list is still invisible');
            expect(await finddocsPF.selectDatePicker(data.dtDate)).toBeTruthy();
            await finddocsPO.btnSearch.click();
    
            expect(await searchResultPO.cbbMainFilter.get(0).getAttribute('value')).toBe(data.dtSpecialty);
            expect(await searchResultPO.cbbMainFilter.get(1).getAttribute('value')).toBe(data.dtLocation);
            await searchResultPO.cbbSubFilter.get(1).click();        
            const curMonthYear = await searchResultPO.lblCalMonthYear.getText();
            const curMonth = new Date(curMonthYear).getMonth() + 1;
            const curYear = new Date(curMonthYear).getFullYear();
            expect(curMonth).toBe(data.dtDate.getMonth() + 1);
            expect(curYear).toBe(data.dtDate.getFullYear());
            expect(parseInt(await searchResultPO.lblSelectedDay.getText())).toBe(data.dtDate.getDate());
            await searchResultPO.cbbSubFilter.get(1).click();
            expect(await searchResulftPF.valLocSpecialty(data.dtLocation, data.dtSpecialty)).toBeTruthy();
        });
    });
})