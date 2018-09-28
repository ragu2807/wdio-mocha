import url from 'url';
import { getSection } from '../../helpers/section-helpers';
import SearchBar from '../sections/header/search-bar';

export default class Page {
  constructor() {
    this.path = '/';
  }

  get searchBar() {
    return getSection(SearchBar, '#search-form');
  }

  open(params) {
    const { queryString, routeParam } = params || {};
    let pageUrl = `/groceries/${REGION}${this.path}`;

    if (routeParam) {
      pageUrl = pageUrl.concat(`/${routeParam}`);
    }

    if (queryString && Object.keys(queryString).length) {
      pageUrl = url.format({
        pathname: pageUrl,
        query: queryString
      });
    }
    browser.url(pageUrl);
  }
}
