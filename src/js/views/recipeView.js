import View from "./View.js";

class RecipeView extends View {
  _parentElement = document.getElementById("recipe-container");
  // servings = 4;

  addHandlerRender(handler) {
    ["load", "hashchange"].forEach(e => window.addEventListener(e, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", e => {
      const btn = e.target.closest(".serving-change-btn");
      if (!btn) return;

      // if (btn.classList.contains("serving-increase")) {
      //   this.servings++;
      // }
      // if (btn.classList.contains("serving-decrease")) {
      //   if (this.servings === 1) return;
      //   this.servings--;
      // }

      const { updateTo } = btn.dataset;

      if (+updateTo > 0) handler(+updateTo);
    });
  }

  _generateMarkup() {
    return `
    <figure id="recipe-fig" class="relative flex justify-center">
            <img class=" w-full h-72 object-cover" src="${this._data.image}" alt="food image" />
            <div class="absolute inset-0 mix-blend-multiply bg-linear-to-br from-grad-1 to-grad-2 opacity-70"></div>

            <h1 class=" text-white absolute bottom-0 -rotate-6 text-wrap w-1/2 text-center">
            <span class="box-decoration-clone  bg-linear-to-br text-sm lg:text-2xl/7  text-center  from-grad-1 to-grad-2 ">${this._data.title}</span>
            </h1>
          </figure>

          <div class="m-4 flex flex-row justify-between  "> 
           <p class="text-grey-dark-2 w-1/3">
            <i class="fa fa-clock text-primary"></i> <span>
             ${this._data.cookingTime} min
            </span>
           </p>
           <p class="text-grey-dark-2 w-1/3">
           <i class="fa fa-users text-primary"></i> <span>
              ${this._data.servings} Servings
            </span> 
           <button class="serving-change-btn cursor-pointer serving-decrease" data-update-to="${this._data.servings - 1}">
            <i class=" fa fa-minus text-primary text-sm"></i> 
           </button>
           <button class="serving-change-btn cursor-pointer serving-increase" data-update-to="${this._data.servings + 1}">
            <i class=" fa fa-plus text-sm text-primary"></i> 
           </button>
           </p>

           <p>
           <i class="fa fa-user text-primary cursor-pointer"></i> 
           <span class="bg-linear-to-br from-grad-1 to-grad-2 rounded-2xl p-1">
           <i class="fa-regular fa-bookmark text-white cursor-pointer "></i> 
           </span>
           </p>
          </div>

          <div class="m-4 flex flex-col bg-amber-50  items-center justify-center p-5">
            <h1 class="text-xl lg:text-2xl  ">Recipe Ingredients</h1>
            <ul id="ingredients-container" class="flex flex-col lg:flex-row flex-wrap justify-between gap-y-5">
                ${this._data.ingredients.map(this._renderRecipeIng).join(" ")}

                
            </ul>
            
          </div>

          
          <div class="m-4 flex flex-col bg-amber-50 items-center justify-center text-center p-5">
            <h1 class="text-xl lg:text-2xl ">How to cook</h1>
            <p class="text-grey-dark-2 text-sm lg:text-base">This recipe was carefully designed and tasted by <span class=" font-bold text-grey-dark-1">${this._data.publisher}</span>.
            <br/>
            Please checkout directions in their website 
            </p>
            
            <button class="mt-5 lg:p-3 p-1 text-white rounded-2xl lg:text-xl cursor-pointer hover:scale-110 transition active:scale-100 active:transition-none bg-linear-to-br from-grad-1 to-grad-2">Directions</button>
          </div>


    `;
  }

  _renderRecipeIng(ing) {
    return `
      <li class="text-sm lg:text-base w-full lg:w-2/5 ">
      <i class="fa fa-check text-primary"></i>
      <span> 
      ${!ing.quantity ? "" : ing.quantity} 
     ${ing.unit} 
     
      ${ing.description}
      </span>
      </li>
    `;
  }
}
export default new RecipeView();
