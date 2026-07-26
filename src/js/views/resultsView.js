import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.getElementById("recipes-list");

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(data => this._generateMarkupPreview(data)).join(" ");
  }

  _generateMarkupPreview(data) {
    return `
    <li class="w-full p-2 ">
      <a class="flex items-center gap-5" href="#${data.id}">
        <figure class="w-1/5">
          <img class="w-16 h-16 rounded-[50%] object-cover" src="${data.image}" alt="recipe image">
        </figure>
        <div class="w-3/5">
          <p class="text-primary text-lg">${data.title}</p>
          <p class="text-sm text-grey-dark-1">${data.publisher}</p>
        </div>
      </a>
    </li>
    
    `;
  }
}

export default new ResultsView();
