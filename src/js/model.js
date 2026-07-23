"use strict";

import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";
import recipeView from "./views/recipeView.js";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      sourceUrl: recipe.source_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      image: recipe.image_url,
      cookingTime: recipe.cooking_time,
    };
  } catch (err) {
    console.warn(err);
    throw err;
  }
};
