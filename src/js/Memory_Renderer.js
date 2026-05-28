import Memory_Card from "./Memory_Card.js";

/**
 * Memory_Renderer – a kártyapárok kirajzolásáért felelős segédosztály
 *
 * Felelős:
 *  - a lista minden eleméből pontosan két {@link Memory_Card} példány létrehozásáért
 *  - a kártyák szülő konténerbe fűzéséért (a DOM-manipulációt a Memory_Card végzi)
 *
 * @note Ez az osztály kizárólag megjelenítést végez – játéklogikát nem tartalmaz.
 *       A keverést és az eseménykezelést a `Memory_Deck` látja el.
 */
export default class Memory_Renderer {
  /** @type {Array<{name: string, url: string}>} A megjelenítendő kártyaadat-lista */
  #lista = [];

  /**
   * Létrehozza a renderert és azonnal kirajzolja az összes kártyapárt.
   *
   * @param {Array<{name: string, url: string}>} lista          – a memory_cat_list tömb; minden elem egy pár alapadata
   * @param {HTMLElement}                        parent_element – a #memory_game konténer, ahová a kártyák kerülnek
   */
  constructor(lista, parent_element) {
    this.#lista = lista;
    this.parent_element = parent_element;
    this.render();
  }

  /**
   * Végigiterál a listán, és minden elemből két {@link Memory_Card} példányt hoz létre.
   * A DOM-ba fűzést a `Memory_Card` konstruktora végzi el automatikusan.
   *
   * @returns {void}
   */
  render() {
    this.#lista.forEach((elem, index) => {
      new Memory_Card(elem, index, this.parent_element);
      new Memory_Card(elem, index, this.parent_element);
    });
  }
}