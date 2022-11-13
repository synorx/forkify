import PreviewView from './previewView.js';

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet.';
  _message = '';

  addHandlerBookmarks(handler) {
    window.addEventListener('load', handler)
  }
}

export default new BookmarksView();
