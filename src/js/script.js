"use strict";

//https://forkify-api.herokuapp.com/v2

const recipeContainer = document.getElementById("recipe-container");
const startingText = document.getElementById("starting-text");

function renderSpinner(parentEl) {
  const html = `
<div class="w-full ">
      <img src="./src/img/spinner.gif" >

    </div>
  `;

  parentEl.innerHTML = "";
  parentEl.insertAdjacentHTML("afterbegin", html);
}
async function getData() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    renderSpinner(recipeContainer);
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
    );

    const data = await res.json();
    console.log(data);
    if (!res.ok)
      throw new Error(`could not do IT ${data.message} ${res.status}`);

    let { recipe } = data.data;

    recipe = {
      id: recipe.id,
      title: recipe.title,
      sourceUrl: recipe.source_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
    };

    // let newLi;
    // function renderIngredients(ingredient) {
    //   const ingriedentContainer = document.getElementById(
    //     "ingredient-container",
    //   );
    //   ingredient.map(rec => {
    //     newLi = `
    //     <div class="flex flex-row">
    //         <p class="w-1/4">${rec.quantity}</p>
    //         <p class="w-1/4">${rec.unit}</p>
    //         <p class="w-2/4">${rec.description}</p>
    //     </div>
    //     `;
    //     ingriedentContainer.insertAdjacentHTML("afterend", newLi);
    //   });
    // }

    console.log(recipe);
    const markup = `
    <figure id="recipe-fig" class="relative flex justify-center">
            <img class=" w-full h-72 object-cover" src="${recipe.image}" alt="food image" />
            <div class="absolute inset-0 mix-blend-multiply bg-linear-to-br from-grad-1 to-grad-2 opacity-70"></div>

            <h1 class=" text-white absolute bottom-0 -rotate-6 text-wrap w-1/2 text-center">
            <span class="box-decoration-clone  bg-linear-to-br text-sm lg:text-2xl/7  text-center  from-grad-1 to-grad-2 ">${recipe.title}<span/>
            </h1>
          </figure>

          <div class="m-4 flex flex-row justify-between  "> 
           <p class="text-grey-dark-2 w-1/3">
            <i class="fa fa-clock text-primary"></i> ${recipe.cookingTime} min
           </p>
           <p class="text-grey-dark-2 w-1/3">
           <i class="fa fa-users text-primary"></i>  ${recipe.servings} Servings
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
                ${recipe.ingredients
                  .map(
                    ingredient =>
                      `
                  <li class="text-sm lg:text-base w-full lg:w-2/5 ">
                  <i class="fa fa-check text-primary"></i>
                   ${!ingredient.quantity ? "" : ingredient.quantity} 
                  ${ingredient.unit} 
                  
                   ${ingredient.description}</li>
                  `,
                    // return console.log(ingredient);
                  )
                  .join(" ")}

                
            </ul>
            
          </div>

          
          <div class="m-4 flex flex-col bg-amber-50 items-center justify-center text-center p-5">
            <h1 class="text-xl lg:text-2xl ">How to cook</h1>
            <p class="text-grey-dark-2 text-sm lg:text-base">This recipe was carefully designed and tasted by <span class=" font-bold text-grey-dark-1">${recipe.publisher}</span>.
            <br/>
            Please checkout directions in their website 
            </p>
            
            <button class="mt-5 lg:p-3 p-1 text-white rounded-2xl lg:text-xl cursor-pointer hover:scale-110 transition active:scale-100 active:transition-none bg-linear-to-br from-grad-1 to-grad-2">Directions</button>
          </div>


    `;

    console.log(recipe.ingredients);
    // recipeContainer.innerHTML = markup;
    recipeContainer.innerHTML = "";

    startingText.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (e) {
    console.error(e);
  }
}

// const recipes = await getData();

// console.log(recipes);

["load", "hashchange"].forEach(e => window.addEventListener(e, getData));

// console.log(window.location.hash);
// const tag = document.querySelectorAll(".tag");
// tag.forEach(t => {
//   t.addEventListener("click", () => {
//     return console.log(window.location.hash);
//   });
// });

const AllIds = fetch("https://forkify-api.jonas.io/api/v2/recipes?search=rice");
AllIds.then(res => res.json()).then(data => console.log(data));
