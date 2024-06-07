import View from './View';
import icons from 'url:../../img/icons.svg'; // parcel 1
import previewView from './previewView';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Recipe found for your query, Please try agian !';
  _message = '';

  addhandlerBookmark(handler) {
    window.addEventListener('load', handler);
  }

  _genaratorMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
