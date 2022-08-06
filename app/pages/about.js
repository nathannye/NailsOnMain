import Page from '../classes/Page.js';
import mapboxgl from 'mapbox-gl';

export default class About extends Page {
  constructor() {
    super({
      id: 'about',
      element: '#aboutWrapper',
      elements: {
        map: '#mapboxContainer',
      },
    });
  }

  create() {
    super.create();
    this.createMap();
  }

  createMap() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoibnllLTExIiwiYSI6ImNsNmF0dTQxdzEwNGEza3Foa2ZmdG05azEifQ.eQOEPfnfljR2sKdnNpaVXQ';
    const map = new mapboxgl.Map({
      container: this.elements.map,
      style: 'mapbox://styles/nye-11/cl5ganty8002b15o5xfrcw9o8',
      center: [-83.41974, 42.72242],
      zoom: 17,
      bearing: -135,
      pitch: 52,
    });

    map.addControl(new mapboxgl.NavigationControl());
  }
}
