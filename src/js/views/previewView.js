import View from "./View.js";

class PreviewView extends View {
  _parentElement = "";

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
    <li class="w-full p-2 ${this._data.id === id ? "bg-gray-200" : ""} hover:-translate-y-1 transition-all duration-150">
      <a class="flex items-center gap-5" href="#${this._data.id}">
        <figure class="w-1/5">
          <img class="w-16 h-16 rounded-[50%] object-cover" src="${this._data.image}" alt="recipe image">
        </figure>
        <div class="w-3/5">
          <p class="text-primary text-lg">${this._data.title}</p>
          <p class="text-sm text-grey-dark-1">${this._data.publisher}</p>
        </div>
      </a>
    </li>
    
    `;
  }
}

export default new PreviewView();
