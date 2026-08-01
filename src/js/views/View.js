export default class View {
  _data;
  _errorMessage = "Couldn't get it , please try again or another one !";

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this._renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = [...newDOM.querySelectorAll("*")];
    const curElements = [...this._parentElement.querySelectorAll("*")];

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ""
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        [...newEl.attributes].forEach(attribute => {
          curEl.setAttribute(attribute.name, attribute.value);
        });
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const html = `
    <div class="w-full ">
          <img src="./src/img/spinner.gif" >
    
        </div>
      `;

    this._parentElement.innerHTML = " ";
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _renderError(message = this._errorMessage) {
    const markup = `
      <div class="p-4 "> 
       
        <p class="text-primary lg:text-xl">  <i class="fa fa-triangle-exclamation text-primary lg:text-xl"></i>${message}</p>
      </div>
    `;

    this._parentElement.innerHTML = " ";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}
