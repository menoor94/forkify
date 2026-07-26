"use strict";

import * as model from "./model.js";
import RecipeView from "./views/recipeView.js";
import SearchView from "./views/searchView.js";
import ResultsView from "./views/resultsView.js";

//https://forkify-api.herokuapp.com/v2
const recipeContainer = document.getElementById("recipe-container");
const startingText = document.getElementById("starting-text");

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    ResultsView.renderSpinner();
    RecipeView.renderSpinner();
    await model.loadRecipe(id);
    RecipeView.render(model.state.recipe);
    ResultsView.render(model.state.search.results);
  } catch (e) {
    console.error(`${e} yooooooooooooo`);
    RecipeView._renderError();
  }
}

async function controlSearchResults() {
  try {
    const query = SearchView.getQuery();

    if (!query) return;

    await model.loadSearchResult(query);
    ResultsView.render(model.state.search.results);
  } catch (err) {
    console.error(`${err} yoy`);
  }
}

function init() {
  RecipeView._addHandlerRender(controlRecipes);
  SearchView._addHandlerSearch(controlSearchResults);
}

init();

// const AllIds = fetch("https://forkify-api.jonas.io/api/v2/recipes?search=rice");
// AllIds.then(res => res.json()).then(data => console.log(data));
