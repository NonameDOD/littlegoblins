import Memory_Card from "./Memory_Card.js";

/**
 * Memory_Deck – a memóriajáték teljes logikája
 *
 * Felelős:
 *  - kártyapárok megkeveréséért
 *  - kártyák kirajzolásáért
 *  - kattintás-esemény kezeléséért (event listener)
 *  - páregyezés ellenőrzéséért
 *  - győzelem detektálásáért
 *  - játék újraindításáért
 */
export default class Memory_Deck {
  /** @type {Memory_Card[]} Memory_Card példányok tömbje */
  #cards = [];

  /** @type {Memory_Card[]} Éppen felfordított, de még nem párosított kártyák (max 2 elem) */
  #flipped = [];

  /** @type {boolean} Ha true, a nem-egyező párt visszaforgatjuk – blokkolja az újabb kattintásokat */
  #locked = false;

  /** @type {number} Sikeresen párosított párok száma */
  #matched_pairs = 0;

  /** @type {number} Az összes pár száma (a lista.length alapján) */
  #total_pairs = 0;

  /** @type {Array<{name: string, url: string}>} Az eredeti kártyalista – újraindításhoz szükséges */
  #lista = [];

  /** @type {HTMLElement|null} Az indító gomb – győzelem után visszajelenik */
  #start_button = null;

  /**
   * Létrehozza a paklit: megkeveri a párokat, példányosítja a kártyákat,
   * és feliratkozik minden kártya kattintás-eseményére.
   *
   * @param {Array<{name: string, url: string}>} lista          – a memory_cat_list tömb; minden elem egy kártyapár alapadata
   * @param {HTMLElement}                        parent_element – a #memory_game konténer, ahová a kártyák és a győzelem-banner kerülnek
   * @param {HTMLElement|null}                   start_button   – az indító gomb elem, amelyet győzelem után visszahozunk (opcionális)
   */
  constructor(lista, parent_element, start_button = null) {
    this.parent_element = parent_element;
    this.#lista = lista;
    this.#start_button = start_button;
    this.#total_pairs = lista.length;
    this.#build_deck(lista);
  }

  // ─── Privát: inicializálás ────────────────────────────────────────────────

  /**
   * Felépíti a paklit: minden listaelemből két kártyát készít (pár),
   * megkeveri őket, majd létrehozza a {@link Memory_Card} példányokat
   * és csatolja a kattintás-eseménykezelőt.
   *
   * @param {Array<{name: string, url: string}>} lista – a memory_cat_list tömb
   * @returns {void}
   */
  #build_deck(lista) {
    const pairs = [...lista, ...lista];
    this.#shuffle(pairs);

    pairs.forEach((obj, index) => {
      const card = new Memory_Card(obj, index, this.parent_element);
      card.element.addEventListener("click", () => this.#onCardClick(card));
      this.#cards.push(card);
    });
  }

  /**
   * Fisher–Yates keverő – helyben (in-place) véletlenszerűsíti a tömböt.
   *
   * @param {Array<*>} arr – a megkeverendő tömb (módosítja az eredetit)
   * @returns {void}
   */
  #shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // ─── Privát: eseménykezelés ───────────────────────────────────────────────

  /**
   * Kattintás-esemény kezelője egyetlen kártyára.
   *
   * @param {Memory_Card} card – a megkattintott kártya példánya
   * @returns {void}
   */
  #onCardClick(card) {
    if (this.#locked) return;
    if (card.is_flipped) return;
    if (card.is_matched) return;

    card.flip();
    this.#flipped.push(card);

    if (this.#flipped.length === 2) {
      this.#check_match();
    }
  }

  // ─── Privát: játéklogika ──────────────────────────────────────────────────

  /**
   * Megvizsgálja, hogy a két felfordított kártya egyezik-e.
   *
   * @returns {void}
   */
  #check_match() {
    this.#locked = true;
    const [a, b] = this.#flipped;

    if (a.name === b.name) {
      a.match();
      b.match();
      this.#matched_pairs++;
      this.#flipped = [];
      this.#locked = false;

      if (this.#matched_pairs === this.#total_pairs) {
        this.#on_win();
      }
    } else {
      setTimeout(() => {
        a.unflip();
        b.unflip();
        this.#flipped = [];
        this.#locked = false;
      }, 1000);
    }
  }

  /**
   * Győzelem-kezelő: törli a kártyákat, gratulációs bannert és
   * „Új játék" gombot jelenít meg, az indító gombot elrejti.
   *
   * @returns {void}
   */
  #on_win() {
    setTimeout(() => {
      // 1. Kártyák törlése
      this.parent_element.innerHTML = "";

      // 2. Gratulációs banner
      const banner = document.createElement("div");
      banner.className = "col-12 alert alert-success text-center fs-4 fw-bold mt-3";
      banner.textContent = "🎉 Gratulálok! Megnyerted a játékot!";
      this.parent_element.appendChild(banner);

      // 3. Újraindító gomb
      const restart_wrapper = document.createElement("div");
      restart_wrapper.className = "col-12 text-center mt-3";

      const restart_btn = document.createElement("button");
      restart_btn.className = "btn btn-primary btn-lg";
      restart_btn.textContent = "🔄 Új játék";
      restart_btn.addEventListener("click", () => this.#reset());

      restart_wrapper.appendChild(restart_btn);
      this.parent_element.appendChild(restart_wrapper);

      // 4. Indító gomb elrejtése
      if (this.#start_button) {
        this.#start_button.classList.add("d-none");
      }
    }, 400);
  }

  /**
   * Visszaállítja a játékot kezdeti állapotba:
   * törli a konténert, nullázza az állapotot, újraépíti a paklit,
   * és visszahozza az indító gombot.
   *
   * @returns {void}
   */
  #reset() {
    // Állapot nullázása
    this.#cards = [];
    this.#flipped = [];
    this.#locked = false;
    this.#matched_pairs = 0;
    this.#total_pairs = this.#lista.length;

    // Konténer ürítése
    this.parent_element.innerHTML = "";

    // Indító gomb visszahozása
    if (this.#start_button) {
      this.#start_button.classList.remove("d-none");
    }

    // Pakli újraépítése
    this.#build_deck(this.#lista);
  }
}