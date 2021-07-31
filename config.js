let Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
    // seleniumAddress = 'http://localhost:4444/wd/hub',
    directConnect: true,
    SELENIUM_PROMISE_MANAGER: false,
    specs: [
        './test_suites/finddocs.js', 
        './test_suites/register.js', 
        './test_suites/login.js'
    ],
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['--start-maximized']
        }
    },
    // multiCapabilities: [{
    //     'browserName': 'chrome',
    //     'chromeOptions': {
    //         'args': ['--start-maximized']
    //     }
    // },{
    //     'browserName': 'firefox'
    // }],
    onPrepare: async() => {
        // await browser.get('https://www.bookdoc.com/', 5000);
        // await browser.wait(protractor.ExpectedConditions.urlIs('https://www.bookdoc.com/'),
        //     10000, 'URL: https://www.bookdoc.com/ is not loaded');
        // browser.waitForAngularEnabled(false);
        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                // cleanDestination: false,
                savePath: 'reports',
                screenshotsFolder: 'screenshots',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                fixedScreenshotName: true,
                fileName: 'TestResult',
                fileNameSeparator: ' ',
                fileNameDateSuffix: true,
            })
        );
    },
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
    }
}