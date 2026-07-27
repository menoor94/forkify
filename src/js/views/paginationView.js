import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.getElementById("pagination-container");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".pagination-btn");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage,
    );

    if (curPage === 1 && numPages > 1) {
      return `
        ${this._generateMarkupBtn("right", curPage + 1)}
      `;
    }

    if (curPage === numPages && numPages > 1) {
      return `
      <div></div>
        ${this._generateMarkupBtn("left", curPage - 1)}
      `;
    }

    if (curPage < numPages) {
      return `
        ${this._generateMarkupBtn("left", curPage - 1)}
        ${this._generateMarkupBtn("right", curPage + 1)}
      `;
    }

    return "";
  }

  _generateMarkupBtn(direction, page) {
    const label = `page ${page}`;
    const icon = `<i class="fa fa-chevron-${direction}"></i>`;
    return `
    <button data-goto=${page} class="pagination-btn text-primary cursor-pointer">
        ${direction === "left" ? `${icon} ${label}` : `${label} ${icon}`}
    </button>
        `;
  }
}

export default new PaginationView();
//  <button id="prev-page" class="text-primary cursor-pointer">
//               <i class="fa fa-chevron-left"></i> previous page
//             </button>
//             <button id="next-page" class="text-primary cursor-pointer">
//               next page<i class="fa fa-chevron-right"></i>
//             </button>
