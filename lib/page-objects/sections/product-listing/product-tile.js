import BaseSection from '../base-section';

export default class ProductTile extends BaseSection {
  get title() {
    return this.section.$('.product-tile--title');
  }
}
