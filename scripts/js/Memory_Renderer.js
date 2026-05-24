import Memory_Card from "./Memory_Card.js";

export default class Memory_Renderer {
  #lista = [];
  constructor(lista, parent_element) {
    this.#lista = lista;
    this.parent_element = parent_element;
    this.render();
  }
  render() {
    this.#lista.forEach((elem, index) => {
      new Memory_Card(elem, index, this.parent_element);
      new Memory_Card(elem, index, this.parent_element);
    });
  }
}
