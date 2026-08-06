import View from "./View.js";
import PreviewView from "./previewView.js";

class bookmarksView extends View {
  _parentElement = document.getElementById("bookmark--list");
  _errorMessage = `  <i class="fas fa-frown text-primary"></i>
                <span> There is no bookmarks yet! </span> `;

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => PreviewView.render(bookmark, false))
      .join(" ");
  }
}

export default new bookmarksView();
