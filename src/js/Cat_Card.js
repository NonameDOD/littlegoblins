export default class Cat_Card {
  #obj = {};
  #index = 0;
  constructor(obj = { name, url }, index, parent_element) {
    this.parent_element = parent_element;
    this.#index = index;
    this.#obj = obj;
    this.render();
  }
  render() {
    let code = `
        <div class="col-12 col-sm-6 col-md-4 mb-4">
          <div class="card h-100">
            <img class="card-img-top" src="${this.#obj.url}" alt="${this.#obj.name}" style="width:100%;max-height:220px;object-fit:contain;background:#f8f9fa;">
            <div class="card-body d-flex align-items-center justify-content-center">
              <p class="card-text text-center mb-0">${this.#obj.name}</p>
            </div>
          </div>
        </div>`;
    this.parent_element.insertAdjacentHTML("beforeend", code);
  }
}
