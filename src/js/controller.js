"use strict";

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

//https://forkify-api.herokuapp.com/v2
const recipeContainer = document.getElementById("recipe-container");
const startingText = document.getElementById("starting-text");

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView._renderSpinner();
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (e) {
    console.error(`${e} yooooooooooooo`);
    recipeView._renderError();
  }
}

function init() {
  recipeView._addHandlerRender(controlRecipes);
}

init();

// const AllIds = fetch("https://forkify-api.jonas.io/api/v2/recipes?search=rice");
// AllIds.then(res => res.json()).then(data => console.log(data));
