export default class Page {
  constructor({ id, elements, element }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      ...elements,
    };
  }
  create() {
    console.log('create' + this.id);
    this.element = document.querySelector(this.selector);
    this.elements = {};
    this.selectorChildren.forEach((e) => {
      console.log(e);
    });
  }
}
