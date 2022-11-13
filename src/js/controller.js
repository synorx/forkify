import * as model from './model.js';
import { MODEL_CLOSE_SEC } from './config.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultViews from './views/resultViews.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    resultViews.update(model.getSearchResultsPage());

    // Loading recipe
    await model.loadRecipe(id);
    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

const controlsSearchResults = async function () {
  try {
    resultViews.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;
    // load search results
    await model.loadSearchResults(query);

    // Render results
    resultViews.render(model.getSearchResultsPage());
    // render pagination button
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlPagination = function (goToPage) {
  resultViews.render(model.getSearchResultsPage(goToPage));
  // render pagination button
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // update the  recipe in state
  model.updatesServings(newServings);

  // update the recipe view
  recipeView.update(model.state.recipe);
  // recipeView.update(model.state.recipe)
};

const controlAddBookmark = function () {
  // Add-remove bookmark
  model.toggleBookmark();
  //Update
  recipeView.update(model.state.recipe);
  //
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks)

    window.history.pushState(null, '', `#${model.state.recipe.id}`)

    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 1000 * MODEL_CLOSE_SEC);
  } catch (err) {
    console.error(err);
    addRecipeView.renderMessage(err.message);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdate(controlServings);
  recipeView.addHandlerBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlsSearchResults);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerBookmarks(controlBookmark);
  addRecipeView.addHandlerFormUpload(controlAddRecipe);
};
init();
