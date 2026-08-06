"use strict";

import * as model from "./model.js";
import RecipeView from "./views/recipeView.js";
import SearchView from "./views/searchView.js";
import ResultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import recipeView from "./views/recipeView.js";
import bookmarksView from "./views/bookmarksView.js";

//https://forkify-api.herokuapp.com/v2
const recipeContainer = document.getElementById("recipe-container");
const startingText = document.getElementById("starting-text");

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView.renderSpinner();
    await model.loadRecipe(id);
    RecipeView.render(model.state.recipe);
    ResultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
  } catch (e) {
    console.error(`something went wrong , ${e}`);
    RecipeView._renderError();
  }
}

async function controlSearchResults() {
  try {
    ResultsView.renderSpinner();

    const query = SearchView.getQuery();

    if (!query) return;

    await model.loadSearchResult(query);
    ResultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`${err} yoy`);
  }
}

function controlServings(newServing) {
  model.updateServings(newServing);

  // RecipeView.render(model.state.recipe);
  RecipeView.update(model.state.recipe);
}

function controlPagination(goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));

  paginationView.render(model.state.search);
}

function controlAddBookmark() {
  // Add/Remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  //Update recipe view
  RecipeView.update(model.state.recipe);

  //render bookmark list
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmarks() {
  bookmarksView.render(model.state.bookmarks);
}

function init() {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  RecipeView.addHandlerUpdateServings(controlServings);
  RecipeView.addHandlerBookmark(controlAddBookmark);
  bookmarksView.addHandlerRender(controlBookmarks);
}

init();
