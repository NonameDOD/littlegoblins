import Cat_Card from "./Cat_Card.js";

/**
 * Gallery – a macskakártya-galéria kirajzolásáért felelős osztály
 *
 * Felelős:
 *  - a lista minden eleméből egy-egy {@link Cat_Card} példány létrehozásáért
 *  - a kártyák szülő konténerbe fűzéséért (a DOM-manipulációt a Cat_Card végzi)
 *
 * @note Ez az osztály kizárólag megjelenítést végez – adatkezelést vagy
 *       eseménykezelést nem tartalmaz.
 */
export default class Gallery {
  /** @type {Array<{name: string, url: string}>} A megjelenítendő kártyaadat-lista */
  #lista = [];

  /**
   * Létrehozza a galériát és azonnal kirajzolja az összes kártyát.
   *
   * @param {Array<{name: string, url: string}>} lista          – a cat_list tömb; minden elem egy macskakártya alapadata
   * @param {HTMLElement}                        parent_element – a konténer, ahová a kártyák kerülnek
   */
  constructor(lista, parent_element) {
    this.#lista = lista;
    this.parent_element = parent_element;
    this.render();
  }

  /**
   * Végigiterál a listán, és minden elemből egy {@link Cat_Card} példányt hoz létre.
   * A DOM-ba fűzést a `Cat_Card` konstruktora végzi el automatikusan.
   *
   * @returns {void}
   */
  render() {
    this.#lista.forEach((elem, index) => {
      new Cat_Card(elem, index, this.parent_element);
    });
  }
}
