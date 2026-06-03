/**
 * Memory_Card – egyetlen kártya modellje és DOM-megjelenítése
 *
 * Felelős:
 *  - a kártya DOM-elemének létrehozásáért és a szülőbe fűzéséért
 *  - a hátlap / előlap közötti vizuális váltásért
 *  - a párosított állapot nyilvántartásáért
 */
export default class Memory_Card {
  /** @type {string} A hátlapon megjelenő kép elérési útja */
  #back_image = "../../assets/images/logo.png";

  /** @type {boolean} true, ha a kártya éppen előlapján mutat (felfordított) */
  #shown = false;

  /** @type {boolean} true, ha a kártya sikeresen párosítva lett – innentől nem fordítható vissza */
  #matched = false;

  /** @type {{name: string, url: string}} A kártyához tartozó adatobjektum */
  #obj = {};

  /** @type {number} A kártya sorszáma a pakliban (0-tól indexelt) */
  #index = 0;

  /** @type {HTMLDivElement|null} A gyökér Bootstrap col-elem DOM-referenciája */
  #element = null;

  /**
   * Létrehoz egy új kártyapéldányt, felépíti a DOM-elemet
   * és rögtön be is fűzi a szülő konténerbe.
   *
   * @param {{name: string, url: string}} obj    – a kártya adatobjektuma (`name`: párosításhoz, `url`: előlap képe)
   * @param {number}                      index  – a kártya sorszáma a paklit alkotó tömbben
   * @param {HTMLElement}                 parent_element – a #memory_game konténer, ahová az elem kerül
   */
  constructor(obj = { name, url }, index, parent_element) {
    this.parent_element = parent_element;
    this.#index = index;
    this.#obj = obj;
    this.#createElement();
  }

  // --- Getterek a Deck logika számára ---

  /**
   * A kártya gyökér DOM-eleme (Bootstrap col-wrapper).
   * A `Memory_Deck` ezen keresztül csatolja az eseménykezelőt.
   *
   * @type {HTMLDivElement}
   */
  get element() {
    return this.#element;
  }

  /**
   * Jelzi, hogy a kártya jelenleg felfordított-e (előlapját mutatja).
   *
   * @type {boolean}
   */
  get is_flipped() {
    return this.#shown;
  }

  /**
   * Jelzi, hogy a kártyát sikeresen párosították-e.
   * Párosított kártyára nem lehet kattintani, és nem lehet visszafordítani.
   *
   * @type {boolean}
   */
  get is_matched() {
    return this.#matched;
  }

  /**
   * A kártya neve – a `Memory_Deck` ezt használja az egyezésvizsgálathoz.
   *
   * @type {string}
   */
  get name() {
    return this.#obj.name;
  }

  // --- Publikus metódusok ---

  /**
   * Felfordítja a kártyát: előlapját mutatja (kép + névfelirat).
   * Párosított kártyán nincs hatása.
   *
   * @returns {void}
   */
  flip() {
    if (this.#matched) return;
    this.#shown = true;
    this.#update();
  }

  /**
   * Visszafordítja a kártyát: ismét a hátlapját mutatja, a névfeliratot eltávolítja.
   * Párosított kártyán nincs hatása.
   *
   * @returns {void}
   */
  unflip() {
    if (this.#matched) return;
    this.#shown = false;
    this.#update();
  }

  /**
   * Sikeresen párosított kártyaként jelöli meg.
   * Zöld keretet rajzol a kártyára, és `#matched`-et `true`-ra állítja –
   * innentől a {@link flip} és {@link unflip} hívások hatástalanok.
   *
   * @returns {void}
   */
  match() {
    this.#matched = true;
    this.#element
      .querySelector(".memory-card-inner")
      .classList.add("border", "border-3", "border-success");
  }

  // --- Privát segédmetódusok ---

  /**
   * Felépíti a kártya teljes DOM-struktúráját és a szülő konténerbe fűzi.
   *
   * Struktúra:
   * ```
   * div.col-6.col-sm-4.col-md-3.mb-3          ← #element (gyökér)
   *   div.card.h-100.memory-card-inner
   *     img.card-img-top                       ← alapból a hátlap képe
   * ```
   *
   * @returns {void}
   */
  #createElement() {
    // Oszlop wrapper (Bootstrap grid)
    const col = document.createElement("div");
    col.className = "col-6 col-sm-4 col-md-3 mb-3";

    // Maga a kártya
    const card = document.createElement("div");
    card.className = "card h-100 memory-card-inner";
    card.style.cursor = "pointer";
    card.style.transition = "opacity 0.2s";

    // Kép – alapból a hátlap
    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = this.#back_image;
    img.alt = "kártya hátlapja";
    img.style.cssText =
      "width:100%; max-height:220px; object-fit:contain; background:#f8f9fa;";

    card.appendChild(img);
    col.appendChild(card);
    this.parent_element.appendChild(col);

    this.#element = col; // eltároljuk a referenciát
  }

  /**
   * Szinkronizálja a DOM-ot az aktuális állapottal (`#shown`).
   *
   * - **Felfordított (`#shown === true`):** az előlap képét és nevét mutatja;
   *   ha még nem létezik `.card-body`, dinamikusan létrehozza a névfelirattal.
   * - **Hátlap (`#shown === false`):** visszaállítja a hátlap képét,
   *   és eltávolítja a `.card-body` elemet (ha volt).
   *
   * @returns {void}
   */
  #update() {
    const card = this.#element.querySelector(".memory-card-inner");
    const img = card.querySelector("img");

    if (this.#shown) {
      img.src = this.#obj.url;
      img.alt = this.#obj.name;

      // Névfelirat hozzáadása, ha még nincs
      if (!card.querySelector(".card-body")) {
        const body = document.createElement("div");
        body.className =
          "card-body d-flex align-items-center justify-content-center";
        body.innerHTML = `<p class="card-text text-center mb-0">${this.#obj.name}</p>`;
        card.appendChild(body);
      }
    } else {
      img.src = this.#back_image;
      img.alt = "kártya hátlapja";
      card.querySelector(".card-body")?.remove();
    }
  }
}