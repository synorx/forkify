import View from './View.js';
import icons from 'url:../../img/icons.svg';
export default class PreviewView extends View {
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(results) {
    const id = window.location.hash.slice(1);
    return `

    <li class="preview">
      <a class="preview__link" href="#${results.id}">
        <figure class="preview__fig">
          <img src="${results.image}" alt="${results.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__tile">${results.title}</h4>
          <p class="preview__publisher">${results.publisher}</p>
          <div class="preview__user-generated ${results.key ? '' : 'hidden'}">
           <svg>
            <use href="${icons}#icon-user"</use>
           </svg>
          </div>
        </div>
      </a>
    </li>
    `;
  }
}
