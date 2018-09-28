import ConfigHelper from '../../lib/helpers/config-helper';

const { general: GENERAL_PRODUCT } = ConfigHelper.load('products');

describe(`${VIEWPORT.toUpperCase()} - Feature: Anonymous Search`, () => {
  before(() => {
    app.homePage.open();
  });

  it('search for a product from homepage should return some relevant products', () => {
    app.homePage.searchBar.searchFor(GENERAL_PRODUCT);
    browser.waitForPageTransition();
    expect(app.searchResultsPage.getSearchHeading()).to.include(GENERAL_PRODUCT);
    expect(app.searchResultsPage.productListing.productTiles).to.not.be.empty;
  });
});
