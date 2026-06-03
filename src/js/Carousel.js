/**
 * Carousel – lightbox carousel a galéria képeihez
 *
 * Felelős:
 *  - az overlay HTML-struktúra létrehozásáért és DOM-ba fűzéséért
 *  - a kártyára kattintás után a megfelelő képnél való megnyitásért
 *  - navigációért (előző/következő gomb, dot-ok, billentyűzet)
 *  - bezárásért (X gomb, overlay kattintás, Escape)
 *
 * Használat:
 *   import Carousel from "./Carousel.js";
 *   const carousel = new Carousel(gallery_cat_list);
 *   carousel.open(2); // megnyitja a 3. képnél
 */
export default class Carousel {
  /** @type {Array<{name: string, url: string}>} A képlista */
  #lista = [];

  /** @type {number} Az aktuálisan mutatott kép indexe */
  #current = 0;

  /** @type {HTMLElement} Az overlay konténer elem */
  #overlay = null;

  /** @type {HTMLImageElement} A carousel fő képeleme */
  #img = null;

  /** @type {HTMLElement} A felirat elem */
  #label = null;

  /** @type {HTMLElement} A dot-ok konténere */
  #dotsContainer = null;

  /**
   * Létrehozza a carousel-t és az overlay-t a DOM-ba fűzi.
   *
   * @param {Array<{name: string, url: string}>} lista – a teljes képlista
   */
  constructor(lista) {
    this.#lista = lista;
    this.#build();
    this.#bindKeys();
  }

  /**
   * Legenerálja az overlay HTML-struktúráját és a document.body végéhez fűzi.
   * @private
   */
  #build() {
    const overlay = document.createElement("div");
    overlay.id = "carousel-overlay";
    overlay.style.cssText = `
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.82);
      z-index: 1000;
      align-items: center;
      justify-content: center;
    `;

    overlay.innerHTML = `
      <div style="
        background: #fff;
        border-radius: 12px;
        overflow: hidden;
        width: min(560px, 95vw);
        box-shadow: 0 8px 32px rgba(0,0,0,0.28);
      ">
        <div style="position: relative; background: #f4f4f2; height: 340px; display: flex; align-items: center; justify-content: center;">
          <img id="carousel-img" src="" alt="" style="max-width: 100%; max-height: 100%; object-fit: contain; display: block;">

          <button id="carousel-prev" aria-label="Előző" style="
            position: absolute; left: 10px; top: 50%; transform: translateY(-50%);
            background: rgba(0,0,0,0.38); border: none; color: #fff;
            width: 36px; height: 36px; border-radius: 50%; font-size: 20px;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
          ">&#8249;</button>

          <button id="carousel-next" aria-label="Következő" style="
            position: absolute; right: 10px; top: 50%; transform: translateY(-50%);
            background: rgba(0,0,0,0.38); border: none; color: #fff;
            width: 36px; height: 36px; border-radius: 50%; font-size: 20px;
            cursor: pointer; display: flex; align-items: center; justify-content: center;
          ">&#8250;</button>
        </div>

        <div style="padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;">
          <span id="carousel-label" style="font-size: 13px; color: #888;"></span>
          <div id="carousel-dots" style="display: flex; gap: 6px;"></div>
          <button id="carousel-close" aria-label="Bezárás" style="
            background: none; border: none; cursor: pointer;
            font-size: 22px; color: #aaa; line-height: 1; padding: 0;
          ">&times;</button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    this.#overlay = overlay;
    this.#img = overlay.querySelector("#carousel-img");
    this.#label = overlay.querySelector("#carousel-label");
    this.#dotsContainer = overlay.querySelector("#carousel-dots");

    overlay.querySelector("#carousel-prev").addEventListener("click", () => this.#goTo(this.#current - 1));
    overlay.querySelector("#carousel-next").addEventListener("click", () => this.#goTo(this.#current + 1));
    overlay.querySelector("#carousel-close").addEventListener("click", () => this.close());
    overlay.addEventListener("click", (e) => { if (e.target === overlay) this.close(); });

    this.#buildDots();
  }

  /**
   * Legenerálja a dot navigációs gombokat.
   * @private
   */
  #buildDots() {
    this.#dotsContainer.innerHTML = "";
    this.#lista.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.setAttribute("aria-label", `Kép ${i + 1}`);
      dot.style.cssText = `
        width: 7px; height: 7px; border-radius: 50%;
        background: ${i === this.#current ? "#333" : "#ccc"};
        border: none; cursor: pointer; padding: 0; transition: background .15s;
      `;
      dot.addEventListener("click", () => this.#goTo(i));
      this.#dotsContainer.appendChild(dot);
    });
  }

  /**
   * Navigál a megadott indexű képre.
   * @param {number} index
   * @private
   */
  #goTo(index) {
    this.#current = (index + this.#lista.length) % this.#lista.length;
    const cat = this.#lista[this.#current];
    this.#img.src = cat.url;
    this.#img.alt = cat.name;
    this.#label.textContent = `${cat.name} · ${this.#current + 1}/${this.#lista.length}`;

    this.#dotsContainer.querySelectorAll("button").forEach((dot, i) => {
      dot.style.background = i === this.#current ? "#333" : "#ccc";
    });
  }

  /**
   * Billentyűzetes navigáció bekötése.
   * @private
   */
  #bindKeys() {
    document.addEventListener("keydown", (e) => {
      if (this.#overlay.style.display === "none") return;
      if (e.key === "ArrowLeft")  this.#goTo(this.#current - 1);
      if (e.key === "ArrowRight") this.#goTo(this.#current + 1);
      if (e.key === "Escape")     this.close();
    });
  }

  /**
   * Megnyitja a carousel-t a megadott indexű képnél.
   *
   * @param {number} startIndex – a megnyitáskor mutatott kép indexe
   */
  open(startIndex = 0) {
    this.#current = startIndex;
    this.#buildDots();
    this.#goTo(startIndex);
    this.#overlay.style.display = "flex";
  }

  /**
   * Bezárja a carousel-t.
   */
  close() {
    this.#overlay.style.display = "none";
  }
}
