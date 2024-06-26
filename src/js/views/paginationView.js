import View from './View.js';
import iconsPath from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // first page
    if (curPage === 1 && numPages > 1) {
      return `
        <div class="pagination__current-page">${curPage}</div>
        ${this._generateMarkupBtnNext(curPage)}
      `;
    }

    // last page
    if (curPage === numPages && numPages > 1) {
      return `
        ${this._generateMarkupBtnPrev(curPage)}
        <div class="pagination__current-page">${curPage}</div>
      `;
    }

    // others page
    if (curPage < numPages) {
      return `
      ${this._generateMarkupBtnPrev(curPage)}
      <div class="pagination__current-page">${curPage}</div>
      ${this._generateMarkupBtnNext(curPage)}
      `;
    }

    // only one page
    return '';
  }

  _generateMarkupBtnNext(curPage) {
    return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
           <use href="${iconsPath}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  _generateMarkupBtnPrev(curPage) {
    return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${iconsPath}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
    `;
  }
}

export default new PaginationView();
