/**
 * main.js – az alkalmazás belépési pontja
 *
 * Felelős:
 *  - a galériá azonnali kirajzolásáért
 *  - a memóriajáték indítógombjának figyeléséért
 *  - a memóriajáték inicializálásáért gombnyomásra
 */

import { gallery_cat_list } from "./gallery_cat_list.js";
import Gallery from "./Gallery.js";
import Memory_Deck from "./Memory_Deck.js";
import { memory_cat_list } from "./memory_cat_list.js";

/** @type {HTMLElement} A galériakártyák szülőkonténere (`#gallery`) */
const galleryContainer = document.getElementById("gallery");

/** @type {HTMLElement} A memóriajáték szülőkonténere (`#memory_game`) */
const memoryContainer = document.getElementById("memory_game");

/** @type {HTMLButtonElement} A memóriajátékot indító gomb a `#memory_game` konténeren belül */
const startBtn = memoryContainer.querySelector("button");

// Galéria – változatlan
new Gallery(gallery_cat_list, galleryContainer);

/**
 * Kattintásra eltávolítja az indítógombot, majd létrehozza a
 * {@link Memory_Deck} példányt, amely elvégzi a keverést,
 * a kártyák kirajzolását és az eseménykezelők csatolását.
 *
 * @listens HTMLButtonElement#click
 */
startBtn.addEventListener("click", () => {
  // Gomb eltávolítása, majd játék létrehozása
  startBtn.remove();
  new Memory_Deck(memory_cat_list, memoryContainer);
});

