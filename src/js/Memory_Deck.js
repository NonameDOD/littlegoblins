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

  /**
   * Létrehozza a paklit: megkeveri a párokat, példányosítja a kártyákat,
   * és feliratkozik minden kártya kattintás-eseményére.
   *
   * @param {Array<{name: string, img: string}>} lista          – a memory_cat_list tömb; minden elem egy kártyapár alapadata
   * @param {HTMLElement}                        parent_element – a #memory_game konténer, ahová a kártyák és a győzelem-banner kerülnek
   */
  constructor(lista, parent_element) {
    this.parent_element = parent_element;
    this.#total_pairs = lista.length;
    this.#build_deck(lista);
  }

  // ─── Privát: inicializálás ────────────────────────────────────────────────

  /**
   * Felépíti a paklit: minden listaelemből két kártyát készít (pár),
   * megkeveri őket, majd létrehozza a {@link Memory_Card} példányokat
   * és csatolja a kattintás-eseménykezelőt.
   *
   * @param {Array<{name: string, img: string}>} lista – a memory_cat_list tömb
   * @returns {void}
   */
  #build_deck(lista) {
    // Minden elemből két példány → megkeverjük
    const pairs = [...lista, ...lista];
    this.#shuffle(pairs);

    // Kártyák létrehozása és event listener csatolása
    pairs.forEach((obj, index) => {
      const card = new Memory_Card(obj, index, this.parent_element);

      card.element.addEventListener("click", () => this.#onCardClick(card));

      this.#cards.push(card);
    });
  }

  /**
   * Fisher–Yates keverő – helyben (in-place) véletlenszerűsíti a tömböt.
   * Időkomplexitás: O(n).
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
   * Eldobja a kattintást, ha:
   *  - a játék le van zárva (`#locked === true`, azaz animáció fut)
   *  - a kártya már fel van fordítva (`card.is_flipped === true`)
   *  - a kártya már párosítva van (`card.is_matched === true`)
   *
   * Ha a kattintás érvényes, felfordítja a kártyát, és ha már két kártya
   * van felfordítva, meghívja az egyezésvizsgálatot.
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

    // Ha már két kártya van felfordítva → egyezés vizsgálata
    if (this.#flipped.length === 2) {
      this.#check_match();
    }
  }

  // ─── Privát: játéklogika ──────────────────────────────────────────────────

  /**
   * Megvizsgálja, hogy a két felfordított kártya egyezik-e (`name` tulajdonság alapján).
   *
   * - **Egyezés esetén:** mindkét kártyát párosítottnak jelöli, növeli a számlálót,
   *   feloldja a zárolást, majd ellenőrzi a győzelmi feltételt.
   * - **Nem egyezés esetén:** 1000 ms után visszafordítja a kártyákat,
   *   törli a `#flipped` tömböt és feloldja a zárolást.
   *
   * @returns {void}
   */
  #check_match() {
    this.#locked = true; // blokkolja a további kattintásokat
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
   * Győzelem-kezelő: 400 ms késleltetéssel egy Bootstrap alert bannert
   * fűz a `parent_element` konténer végéhez.
   *
   * A késleltetés az utolsó párosítás CSS-animációjának befejezését várja meg,
   * hogy a banner ne jelenjen meg az animáció felett.
   *
   * @returns {void}
   */
  #on_win() {
    setTimeout(() => {
      // Győzelem banner a konténerbe
      const banner = document.createElement("div");
      banner.className =
        "col-12 alert alert-success text-center fs-4 fw-bold mt-3";
      banner.textContent = "🎉 Gratulálok! Megnyerted a játékot!";
      this.parent_element.appendChild(banner);
    }, 400);
  }
}