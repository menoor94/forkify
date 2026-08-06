import View from "./View.js";
import PreviewView from "./previewView.js";

class ResultsView extends View {
  _parentElement = document.getElementById("recipes-list");
  _errorMessage = `Could not find the recipe you want , please try again or another recipe!`;

  _generateMarkup() {
    return this._data
      .map(reuslt => PreviewView.render(reuslt, false))
      .join(" ");
  }
}

export default new ResultsView();
