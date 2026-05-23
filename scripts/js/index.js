import { gallery_cat_list } from "./gallery_cat_list.js";
import Gallery from "./Gallery.js";
import Memory_Deck from "./memory_deck.js";
import { memory_cat_list } from "./memory_cat_list.js";
 
const galleryContainer = document.getElementById("gallery");
const memoryContainer  = document.getElementById("memory_game");
const startBtn         = memoryContainer.querySelector("button");
 
// Galéria – változatlan
new Gallery(gallery_cat_list, galleryContainer);
 
// Memóriajáték indítása a gombra kattintva
startBtn.addEventListener("click", () => {
  // Gomb eltávolítása, majd játék létrehozása
  startBtn.remove();
  new Memory_Deck(memory_cat_list, memoryContainer);
});
 