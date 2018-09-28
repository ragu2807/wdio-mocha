import chai from 'chai';
import chaiWebdriver from 'chai-webdriverio';
import getBrowserArgs from '../lib/helpers/get-browser-args';
import ConfigHelper from '../lib/helpers/config-helper';
import customCommands from '../lib/helpers/custom-commands';

const debug = process.env.DEBUG;
const timeout = debug ? 999999999 : 400000;

global.ENVIRONMENT = process.env.ENVIRONMENT || 'prod';
global.COUNTRY = process.env.COUNTRY || 'uk';
const { baseURL, language } = ConfigHelper.load('environments');

global.BASE_URL = process.env.BASE_URL || baseURL;
global.REGION = process.env.REGION === 'native' ? language.native : 'en-GB';

const VIEWPORTS = (process.env.VIEWPORTS &&
  process.env.VIEWPORTS.toLowerCase().split(',')) || ['desktop'];

const getCapabilities = () => {
  return VIEWPORTS.map(viewport => ({
    maxInstances: 3,
    VIEWPORT: viewport,
    browserName: 'chrome',
    chromeOptions: {
      args: getBrowserArgs(viewport)
    }
  }));
}

export const config = {
  specs: ['./specs/**/*.js'],
  suites: {
    search: [
      './specs/functional/search-spec.js',
    ]
  },
  maxInstances: 10,
  capabilities: getCapabilities(),
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  deprecationWarnings: false,
  bail: 0,
  debug,
  execArgv: debug && ['--inspect'],
  screenshotPath: './error-shots',
  screenshotOnReject: true,
  baseUrl: BASE_URL,
  waitforTimeout: 60000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['selenium-standalone'],
  seleniumLogs: './selenium-logs',
  framework: 'mocha',
  reporters: ['spec', 'allure'],
  reporterOptions: {
    allure: {
      outputDir: 'test-output',
      disableWebdriverStepsReporting: true
    }
  },
  mochaOpts: {
    ui: 'bdd',
    timeout,
    compilers: ['js:babel-register']
  },
  before() {
    customCommands();
    chai.use(chaiWebdriver(browser));
    global.expect = chai.expect;
    global.VIEWPORT = browser.options.desiredCapabilities.VIEWPORT;
    global.app = require(`../lib/page-objects/pages/${VIEWPORT}-index`);
  }
};
