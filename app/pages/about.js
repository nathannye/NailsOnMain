import Page from '../classes/Page.js';

export default class About extends Page {
  constructor() {
    super({
      id: 'about',
      element: '#aboutWrapper',
    });
  }
}
