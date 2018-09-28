# wdio-mocha
UI automation using **WebdriverIO** &amp; **Mocha**

### Environment setup

We are using,

* [WebdriverIO](http://webdriver.io/) (WebDriver bindings for Node.js) as a test runner which uses selenium-standalone service to interact with the browser. 

* [Mocha](https://mochajs.org/) framework and writing tests in BDD style.

* [Chai](http://chaijs.com/) for assertions along with [Chai-WebdriverIO](http://webdriver.io/guide/plugins/chai-webdriverio.html) which provides WebdriverIO sugar for the chai.


Follow the below steps to setup your local machine to run the integration tests locally.
As a pre-requisite, make sure you have chrome browser, Node.js and Java version 8 or above installed on your machine.
In the terminal, type `java`, if it is unrecognized, follow the below steps to get it installed. If you have Java installed already, skip step 1.


1. `Install` [Java](https://java.com/en/download/mac_download.jsp) (recommended - version 8)
	 
2. `npm install` from root folder

### How to run tests on a local machine?

Now that your environment is set up and ready to run the integration tests, there are some tests that are already written and you can find them under `specs/functional`. The tests are categorized, grouped based on the functionalities, components they represent on the website, etc., and formed as test suites. When you run any spec or a suite, the configuration to run the test is picked from the `config/wdio.conf.js`. The different test suites can be found under **suites** section in [config/wdio.conf.js](https://github.com/ragu2807/wdio-mocha/blob/master/config/wdio.conf.js). The test can be run in any combination of viewports (mobile, tablet, desktop). You can run multiple suite(s) in multiple viewports simultaneously.

In order to run any test suite(s) in any viewport(s), pass them comma separated with suite(s) and viewport(s) separated by a space character to the `npm run suite` command.
 
 *e.g:* `npm run suite -- search,smoke mobile,tablet` - will run search and smoke suites in mobile and tablet viewports
 
 If no viewports passed, by default VIEWPORTS will be set to desktop
 
 *e.g:* `npm run suite -- search` - will run tests under search suite in desktop viewport
 
 If you wish to run only one spec, not the entire suite, you can do that using
 
 `VIEWPORTS=desktop,tablet npm test -- --spec=search-spec` - will run search spec in desktop and tablet viewports
 
 There are many other different combinations you can tell the test runner to run tests according to your need, You can find the different combinations under [organizing suite](http://webdriver.io/guide/testrunner/organizesuite.html) section in the WebdriverIO documentation.
 
 If you wish to run only the tests inside a specific describe, it blocks in the spec, try `describe.only` or `it.only` so that only the specified tests inside the describe or it block will run. If you wish to skip the tests inside any describe, it blocks, use `describe.skip` or `it.skip` so that the tests inside these describe, it blocks are skipped while running the tests.

### How to generate test report?

We are using [Allure](http://allure.qatools.ru/) reporter for creating tests reports. In order create an HTML report after the tests run locally, try running the below command.

* `npm run report`


This command also runs as a `posttest` when `npm test` command is used.
An HTML report is created with the test ouput and you can see the passed, failed and skipped test cases. In case a test fails, you can find the reason for the failure in the test itself and the screenshot of the page where the test failed is also attached to the report.

### How to clean project?

Every time the test runs, the test output is created under `test-output` folder and in case of failures the screenshots are captured for the page where the tests failed and stored in `error-shots` folder. Also, the tests reports are stored under `reports` folder. In order to remove the previous run test-outputs, error-shots and reports and start a clean test run, use the below command.

* `npm run clean`

This command also runs as a `pretest` when `npm test` command is used.

### How to debug tests?

In order to debug tests, add a snippet `browser.debug()` in the code from where you want to start debugging.

Run the test with DEBUG flag `DEBUG=true npm run suite -- search desktop`

The debugger will stop at the `browser.debug()` statement from where you can proceed running the test commands in debugger terminal. Alternatively, you can use the Chrome dev-tool debugging as well. For more information on debugging tests, refer [debugging](http://webdriver.io/guide/testrunner/debugging.html) section in WebdriverIO documentation.

### Adding new tests
If you are adding new specs, please refer the existing tests for the approach to be followed. Following are some of the guidelines for the approach to be followed while writing the tests.

#### Page object pattern

We are following the [page object pattern](http://webdriver.io/guide/testrunner/pageobjects.html) in which each page across the website is represented as pages in the tests as well, which you can find under `page-objects/pages` folder and the sections that are common across pages are created and re-used across pages which can be found under `page-objects/sections`. Anything that is common across page should go into `base-page` so that it can be used across all page objects since all pages extend the base-page.

Any element on the page/section should be represented as a getter and the elements/methods should be properly named.

*e.g* Sign-in button on the homePage should be represented as 

```
get signInButton() {
  return $('[data-auto="hp-signin-btn"]');
}
```
and the sign-in link on the utility bar should be represented as

```
get signInLink() {
  return $('.utility-header__login');
}
```

Elements and methods common to 2 or more viewports should go into the base and elements/methods specific to the viewport should be mentioned in the specific viewport file itself.
