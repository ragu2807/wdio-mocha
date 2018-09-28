import Page from '../base-page';
import { getSection } from '../../../helpers/section-helpers';
import ProductListing from '../../sections/product-listing/product-list';

export class SearchResultsPage extends Page {
  constructor() {
    super();
    this.path = '/search';
  }

  get heading() {
    return $('h1');
  }

  get productListing() {
    return getSection(ProductListing, '[data-auto="product-list-container"]');
  }

  getSearchHeading() {
    this.heading.waitForVisible();

    return this.heading.getText();
  }
}

export default new SearchResultsPage();
