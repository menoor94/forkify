class recipeView {
  #parentElement = document.getElementById("recipe-container");
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("beforeend", markup);
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  renderSpinner() {
    const html = `
    <div class="w-full ">
          <img src="./src/img/spinner.gif" >
    
        </div>
      `;

    this.#parentElement.innerHTML = " ";
    this.#parentElement.insertAdjacentHTML("afterbegin", html);
  }

  #generateMarkup() {
    return `
    <figure id="recipe-fig" class="relative flex justify-center">
            <img class=" w-full h-72 object-cover" src="${this.#data.image}" alt="food image" />
            <div class="absolute inset-0 mix-blend-multiply bg-linear-to-br from-grad-1 to-grad-2 opacity-70"></div>

            <h1 class=" text-white absolute bottom-0 -rotate-6 text-wrap w-1/2 text-center">
            <span class="box-decoration-clone  bg-linear-to-br text-sm lg:text-2xl/7  text-center  from-grad-1 to-grad-2 ">${this.#data.title}<span/>
            </h1>
          </figure>

          <div class="m-4 flex flex-row justify-between  "> 
           <p class="text-grey-dark-2 w-1/3">
            <i class="fa fa-clock text-primary"></i> ${this.#data.cookingTime} min
           </p>
           <p class="text-grey-dark-2 w-1/3">
           <i class="fa fa-users text-primary"></i>  ${this.#data.servings} Servings
          <i class="fa fa-minus text-primary text-sm cursor-pointer"></i> <i class="fa fa-plus text-sm cursor-pointer text-primary"></i> 
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
                ${this.#data.ingredients.map(this.#renderRecipeIng).join(" ")}

                
            </ul>
            
          </div>

          
          <div class="m-4 flex flex-col bg-amber-50 items-center justify-center text-center p-5">
            <h1 class="text-xl lg:text-2xl ">How to cook</h1>
            <p class="text-grey-dark-2 text-sm lg:text-base">This recipe was carefully designed and tasted by <span class=" font-bold text-grey-dark-1">${this.#data.publisher}</span>.
            <br/>
            Please checkout directions in their website 
            </p>
            
            <button class="mt-5 lg:p-3 p-1 text-white rounded-2xl lg:text-xl cursor-pointer hover:scale-110 transition active:scale-100 active:transition-none bg-linear-to-br from-grad-1 to-grad-2">Directions</button>
          </div>


    `;
  }

  #renderRecipeIng(ing) {
    return `
      <li class="text-sm lg:text-base w-full lg:w-2/5 ">
      <i class="fa fa-check text-primary"></i>
       ${!ing.quantity ? "" : new Fraction(ing.quantity)} 
      ${ing.unit} 
      
       ${ing.description}</li>
    `;
  }
}
export default new recipeView();
