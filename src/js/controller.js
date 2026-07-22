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
    recipeView._renderSpinner();
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

    // recipeContainer.innerHTML = markup;

    // startingText.innerHTML = "";
  } catch (e) {
    console.error(e);
  }
}

["load", "hashchange"].forEach(e => window.addEventListener(e, getData));

const AllIds = fetch("https://forkify-api.jonas.io/api/v2/recipes?search=rice");
AllIds.then(res => res.json()).then(data => console.log(data));
