import View from './View.js';
import icons from 'url:../../img/icons.svg';
import resultView from './resultViews';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler){
    this._parentElement.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      console.log(btn.dataset.goto);
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    })
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    const prevButton = `
    <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
        <span>Page ${currentPage - 1}</span>
    </button>
    `;
const nextButton = `
    <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
    </button>
    `;

    if (currentPage === 1 && numPages > 1) {
      return nextButton;
    }

    if (currentPage === numPages && numPages > 1) {
      return prevButton;
    }

    if (currentPage < numPages) {
      return [prevButton , nextButton];
    }

    return '';
  }
}

export default new PaginationView();
