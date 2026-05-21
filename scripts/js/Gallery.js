import Cat_Card from "./Cat_Card.js";

export default class Gallery {
  #lista = [];
  constructor(lista, parent_element) {
    this.#lista = lista;
    this.parent_element = parent_element;
    this.render();
  }
  render() {
    this.#lista.forEach((elem, index) => {
      new Cat_Card(elem, index, this.parent_element);
    });
  }
}
