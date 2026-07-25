class SearchView {
  #parentEl = document.getElementById("search-form");

  _getQuery() {
    const query = this.#parentEl.querySelector("#search-input").value;
    this.#clear();
    return query;
  }

  #clear() {
    this.#parentEl.querySelector("#search-input").value = "";
  }

  _addHandlerSearch(handler) {
    this.#parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
