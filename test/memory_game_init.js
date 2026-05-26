import Memory_Deck from "../scripts/js/memory_deck.js";
import { memory_cat_list } from "../scripts/js/memory_cat_list.js";

const memoryContainer  = document.getElementById("memory_game");
new Memory_Deck(memory_cat_list, memoryContainer);