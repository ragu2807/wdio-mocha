export default class BaseSection {
  constructor(css, index) {
    this.section = $$(css)[index];
  }
}
