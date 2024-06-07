import View from './View';
import icons from 'url:../../img/icons.svg'; // parcel 1
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No Bookmark yet. find a nice recipe and Bookmark it :)';
  _message = '';
  _genaratorMarkup() {
    return this._data
      .map(results => previewView.render(results, false))
      .join('');
  }
}

export default new ResultsView();
