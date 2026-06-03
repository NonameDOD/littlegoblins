import Memory_Card from "../src/js/Memory_Card.js";

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
  #cards = []; // Memory_Card példányok tömbje
  #flipped = []; // éppen felfordított (de még nem párosított) kártyák (max 2)
  #locked = false; // true, amíg a nem-egyező párt visszaforgatjuk
  #matched_pairs = 0; // sikeresen párosított párok száma
  #total_pairs = 0; // az összes pár száma

  /**
   * @param {Array}       lista           – a memory_cat_list tömb
   * @param {HTMLElement} parent_element  – a #memory_game konténer
   */
  constructor(lista, parent_element) {
    this.parent_element = parent_element;
    this.#total_pairs = lista.length;
    this.#build_deck(lista);
  }
  // ─── Privát: inicializálás ────────────────────────────────────────────────
  #build_deck(lista) {
    // Minden elemből két példány → megkeverjük
    const pairs = [...lista, ...lista];

    // Kártyák létrehozása és event listener csatolása
    pairs.forEach((obj, index) => {
      const card = new Memory_Card(obj, index, this.parent_element);

      card.element.addEventListener("click", () => this.#onCardClick(card));

      this.#cards.push(card);
    });
  }

  // ─── Privát: eseménykezelés ───────────────────────────────────────────────

  /**
   * Kattintás-esemény kezelője.
   * Eldobja a kattintást ha:
   *  - a játék le van zárva (animáció fut)
   *  - a kártya már fel van fordítva
   *  - a kártya már párosítva van
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

  #check_match() {
    this.#locked = true; // blokkolja a további kattintásokat
    const [a, b] = this.#flipped;

    if (a.name === b.name) {
      // ✅ Egyezés
      a.match();
      b.match();
      this.#matched_pairs++;
      this.#flipped = [];
      this.#locked = false;

      if (this.#matched_pairs === this.#total_pairs) {
        this.#on_win();
      }
    } else {
      // ❌ Nem egyeznek → 1 mp után visszaforgatjuk
      setTimeout(() => {
        a.unflip();
        b.unflip();
        this.#flipped = [];
        this.#locked = false;
      }, 1000);
    }
  }

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
