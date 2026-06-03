import Memory_Deck from "./Memory_Deck.js";
import { memory_cat_list } from "../src/js/memory_cat_list.js";

const memory_container = document.getElementById("memory_game");
const deck = new Memory_Deck(memory_cat_list, memory_container);