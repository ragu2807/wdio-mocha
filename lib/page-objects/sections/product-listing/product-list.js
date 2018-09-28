import { getSections } from '../../../helpers/section-helpers';
import BaseSection from '../base-section';
import ProductTile from './product-tile';

export default class ProductList extends BaseSection {
  get productTiles() {
    return getSections(ProductTile, '.product-list--list-item');
  }
}
