export default class Memory_Card {
  #card = "../../assets/images/logo.png";
  #shown = false;
  #obj = {};
  #index = 0;
  constructor(obj = { name, url }, index, parent_element) {
    this.parent_element = parent_element;
    this.#index = index;
    this.#obj = obj;
    this.render();
  }
  render() {
    const link = this.#shown ? this.#obj.url : this.#card;
    const desc = this.#shown ?  `<div class="card-body d-flex align-items-center justify-content-center">
              <p class="card-text text-center mb-0">${this.#obj.name}</p>
            </div>`: ``;
    let code = `
        <div class="col-12 col-sm-6 col-md-3 mb-3">
          <div class="card h-100">
            <img class="card-img-top" src="${link}" alt="${this.#obj.name}" style="width:100%;max-height:220px;object-fit:contain;background:#f8f9fa;">
            ${desc}
          </div>
        </div>`;
    this.parent_element.insertAdjacentHTML("beforeend", code);
  }
}
