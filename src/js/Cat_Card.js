/**
 * Cat_Card – egyetlen macskakártya modellje és DOM-megjelenítése
 *
 * Felelős:
 *  - a kártya HTML-struktúrájának generálásáért
 *  - a kártya szülő konténerbe fűzéséért (`insertAdjacentHTML`)
 *
 * @note Ez az osztály kizárólag megjelenítést végez – állapotkezelést vagy
 *       eseménykezelést nem tartalmaz.
 */
export default class Cat_Card {
  /** @type {{name: string, url: string}} A kártyához tartozó adatobjektum */
  #obj = {};

  /** @type {number} A kártya sorszáma a listában (0-tól indexelt) */
  #index = 0;

  /**
   * Létrehoz egy új kártyapéldányt és azonnal ki is rajzolja a szülő konténerbe.
   *
   * @param {{name: string, url: string}} obj            – a kártya adatobjektuma (`name`: felirat, `url`: képforrás)
   * @param {number}                      index          – a kártya sorszáma a forráslistában
   * @param {HTMLElement}                 parent_element – a konténer, ahová a kártya kerül
   */
  constructor(obj = { name, url }, index, parent_element) {
    this.parent_element = parent_element;
    this.#index = index;
    this.#obj = obj;
    this.render();
  }

  /**
   * Legenerálja a kártya Bootstrap-kompatibilis HTML-struktúráját
   * és `insertAdjacentHTML("beforeend", ...)` segítségével a szülő végéhez fűzi.
   *
   * Generált struktúra:
   * ```
   * div.col-12.col-sm-6.col-md-4.mb-4
   *   div.card.h-100
   *     img.card-img-top          ← #obj.url / #obj.name
   *     div.card-body
   *       p.card-text             ← #obj.name
   * ```
   *
   * @returns {void}
   */
  render() {
    let code = `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
          <div class="card h-100">
            <img class="card-img-top" src="${this.#obj.url}" alt="${this.#obj.name}" style="width:100%;max-height:220px;object-fit:contain;background:#f8f9fa;">
            <div class="card-body d-flex align-items-center justify-content-center">
              <p class="card-text text-center mb-0">${this.#obj.name}</p>
            </div>
          </div>
        </div>`;
    this.parent_element.insertAdjacentHTML("beforeend", code);
  }
}