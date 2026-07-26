class SearchView {
  _parentEl = document.getElementById("search-form");

  getQuery() {
    const query = this._parentEl.querySelector("#search-input").value;
    this._clear();
    return query;
  }

  _clear() {
    this._parentEl.querySelector("#search-input").value = "";
  }

  _addHandlerSearch(handler) {
    this._parentEl.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
