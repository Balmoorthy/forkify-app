import * as model from './model.js';
import ResultsView from './views/ResultsView.js';
import SearchView from './views/SearchView.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';
import BookmarksView from './views/BookmarksView.js';
import addRecipeView from './views/addRecipeView.js';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.spinnerRender();

    // 0) Update Results
    ResultsView.update(model.getSearchResultsPage());

    // 1) Updating bookmark viewa
    BookmarksView.update(model.state.bookmark);

    // 2. loading data recipes
    await model.loadRecipe(id);

    // 3. rendering images
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

// if (module.hot) {
//   module.hot.accept();
// }

const controlSearchResults = async function () {
  try {
    ResultsView.spinnerRender();
    // 1) Get Search Query
    const query = SearchView.getQuery();
    if (!query) return;

    // 2) Load search results
    await model.loadSearchResults(query);

    // 3) Render results
    // ResultsView.render(model.state.search.results);
    ResultsView.render(model.getSearchResultsPage());

    // 4) Render initial Pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
const contorlPagination = function (goToPage) {
  // 1) Render New results
  // ResultsView.render(model.state.search.results);
  ResultsView.render(model.getSearchResultsPage(goToPage));
  // 2) Render New Pagination buttons
  paginationView.render(model.state.search);
};

const controlServing = function (newServings) {
  // Update the recipe serving (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1) Add and remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // REnder Bookmarks

  BookmarksView.render(model.state.bookmark);
};

const controlBookmark = function () {
  BookmarksView.render(model.state.bookmark);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Upload the new Recipe data
    await model.uploadRecipe(newRecipe);
  } catch (error) {
    console.error('🎉', error);
    addRecipeView.renderError(error.message);
  }
};
const init = function () {
  BookmarksView.addhandlerBookmark(controlBookmark);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpadateServing(controlServing);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(contorlPagination);
  recipeView.addhandlerBookmark(controlAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
