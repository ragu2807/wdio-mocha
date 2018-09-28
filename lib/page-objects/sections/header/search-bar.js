import BaseSection from '../base-section';

export default class SearchBar extends BaseSection {
  get searchInput() {
    return this.section.$('#search-input');
  }

  get searchIcon() {
    return this.section.$('button.search-bar__submit.icon-search-white');
  }

  searchFor(searchTerm) {
    this.searchInput.waitForVisible();
    this.searchInput.setValue(searchTerm);
    this.searchIcon.click();
  }
}