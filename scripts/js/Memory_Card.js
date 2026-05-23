export default class Memory_Card {
  #backImage = "../../assets/images/logo.png";
  #shown = false;
  #matched = false;
  #obj = {};
  #index = 0;
  #element = null; // a gyökér col elem DOM referenciája

  constructor(obj = { name, url }, index, parent_element) {
    this.parent_element = parent_element;
    this.#index = index;
    this.#obj = obj;
    this.#createElement();
  }

  // --- Getterek a Deck logika számára ---
  get element()    { return this.#element; }
  get isFlipped()  { return this.#shown; }
  get isMatched()  { return this.#matched; }
  get name()       { return this.#obj.name; }

  // --- Publikus metódusok ---
  flip() {
    if (this.#matched) return;
    this.#shown = true;
    this.#update();
  }

  unflip() {
    if (this.#matched) return;
    this.#shown = false;
    this.#update();
  }

  /** Sikeresen párosított kártya – többé nem fordítható vissza */
  match() {
    this.#matched = true;
    this.#element
      .querySelector(".memory-card-inner")
      .classList.add("border", "border-3", "border-success");
  }

  // --- Privát segédmetódusok ---
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
    img.src = this.#backImage;
    img.alt = "kártya hátlapja";
    img.style.cssText =
      "width:100%; max-height:220px; object-fit:contain; background:#f8f9fa;";

    card.appendChild(img);
    col.appendChild(card);
    this.parent_element.appendChild(col);

    this.#element = col; // eltároljuk a referenciát
  }

  /** Szinkronizálja a DOM-ot az aktuális állapottal */
  #update() {
    const card = this.#element.querySelector(".memory-card-inner");
    const img  = card.querySelector("img");

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
      img.src = this.#backImage;
      img.alt = "kártya hátlapja";
      card.querySelector(".card-body")?.remove();
    }
  }
}