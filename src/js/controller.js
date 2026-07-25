"use strict";

import * as model from "./model.js";
import RecipeView from "./views/recipeView.js";
import SearchView from "./views/searchView.js";

//https://forkify-api.herokuapp.com/v2
const recipeContainer = document.getElementById("recipe-container");
const startingText = document.getElementById("starting-text");

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView._renderSpinner();
    await model.loadRecipe(id);

    RecipeView.render(model.state.recipe);
  } catch (e) {
    console.error(`${e} yooooooooooooo`);
    RecipeView._renderError();
  }
}

async function controlSearchResults() {
  try {
    const query = SearchView._getQuery();

    if (!query) return;

    await model.loadSearchResult(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(`${err} yoy`);
  }
}

function init() {
  RecipeView._addHandlerRender(controlRecipes);
  SearchView._addHandlerSearch(controlSearchResults);
}

init();

// const AllIds = fetch("https://forkify-api.jonas.io/api/v2/recipes?search=rice");
// AllIds.then(res => res.json()).then(data => console.log(data));
