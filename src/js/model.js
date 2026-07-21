export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
    );

    const data = await res.json();
    console.log(data);
    if (!res.ok)
      throw new Error(`could not do IT ${data.message} ${res.status}`);

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
    console.log(recipe);
  } catch (err) {
    console.warn(err);
  }
};
