"use strict";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

//https://forkify-api.herokuapp.com/v2
const recipeContainer = document.getElementById("recipe-container");
const startingText = document.getElementById("starting-text");

async function getData() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

    // recipeContainer.innerHTML = markup;

    // startingText.innerHTML = "";
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
