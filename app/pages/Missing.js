import Page from 'classes/Page.js';

export default class Missing extends Page {
  constructor() {
    super({
      id: 'missing',
      element: '#404Wrapper',
    });
  }
  create() {
    super.create();
  }
}
