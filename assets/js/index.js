import { gallery_cat_list } from "./gallery_cat_list.js";
import Cat_Card from "./Cat_Card.js";
import Gallery from "./Gallery.js";

const galleryContainer = document.getElementById("gallery");

new Gallery(gallery_cat_list,galleryContainer)
