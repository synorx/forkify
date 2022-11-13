import PreviewView from './previewView.js';


class ResultViews extends PreviewView {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found your query';
  _message = '';

}

export default new ResultViews();
