import { gallery_cat_list } from "./gallery_cat_list.js";
import Cat_Card from "./Cat_Card.js";
import Gallery from "./Gallery.js";
import Memory_Renderer from "./Memory_Renderer.js";
import { memory_cat_list } from "./memory_cat_list.js";

const galleryContainer = document.getElementById("gallery");
const memoryContainer = document.getElementById("memory_game");

new Gallery(gallery_cat_list,galleryContainer);
new Memory_Renderer(memory_cat_list,memoryContainer);