import Cat_Card from "./Cat_Card.js";

export default class Gallery {
  #lista = [];
  constructor(lista, parentElement) {
    this.#lista = lista;
    this.parentElement = parentElement;
    this.render();
  }
  render() {
    this.#lista.forEach((elem, index) => {
      new Cat_Card(elem, index, this.parentElement);
    });
  }
}
