// const templateValue = document.querySelector('#template-book').innerHTML;
// const compiledTemplate = Handlebars.compile(templateValue);
// const bookList = document.querySelector('.books-list');
// let filters = [];
// const filtersForm = document.querySelector('.filters');

// function render() {
//   for (const book of dataSource.books) {
//     const ratingBgc = determineRatingBgc(book.rating);
//     const ratingWidth = (book.rating / 10) * 100;
//     book.ratingWidth = ratingWidth;
//     book.ratingBgc = ratingBgc;
//     const generatedHTML = compiledTemplate(book);
//     const generatedDom = utils.createDOMFromHTML(generatedHTML);

//     bookList.appendChild(generatedDom);
//   }
//   initActions();
// }

// function initActions() {
//   let favoriteBooks = [];

//   bookList.addEventListener('dblclick', function (event) {
//     event.preventDefault();
//     const clickedBook = event.target.closest('.book');

//     if (clickedBook) {
//       const bookImage = clickedBook.querySelector('.book__image');
//       const bookId = bookImage.dataset.id;
//       bookImage.classList.toggle('favorite');

//       if (!favoriteBooks.includes(bookId)) {
//         favoriteBooks.push(bookId);
//       } else {
//         favoriteBooks = favoriteBooks.filter((el) => el !== bookId);
//       }
//       console.log(favoriteBooks);
//     }
//   });
//   filtersForm.addEventListener('click', function (event) {
//     if (
//       event.target.tagName === 'INPUT' &&
//       event.target.type === 'checkbox' &&
//       event.target.name === 'filter'
//     ) {
//       if (event.target.checked) {
//         filters.push(event.target.value);
//       } else {
//         filters = filters.filter((el) => el !== event.target.value);
//       }
//       console.log(filters);
//     }
//     filterBooks();
//   });
// }
// function filterBooks() {
//   const allBooks = document.querySelectorAll('.book');

//   for (const book of allBooks) {
//     const bookImage = book.querySelector('.book__image');
//     const bookId = bookImage.dataset.id;
//     const bookData = dataSource.bookImage.find((book) => book.id == bookId);

//     let shouldBeHidden = false;

//     for (const filter of filters) {
//       if (!bookData.details[filter]) {
//         shouldBeHidden = true;
//         break;
//       }
//     }
//     if (shouldBeHidden) {
//       bookImage.classList.add('hidden');
//     } else {
//       bookImage.classList.remove('hidden');
//     }
//   }
// }
// function determineRatingBgc(rating) {
//   if (rating < 6) {
//     return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
//   } else if (rating > 6 && rating <= 8) {
//     return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
//   } else if (rating > 8 && rating <= 9) {
//     return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
//   } else if (rating > 9) {
//     return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
//   }
// }

// render();
class BooksList {
  constructor(dataSource, utils) {
    const thisBook = this;
    thisBook.dataSource = dataSource;
    thisBook.utils = utils;
    thisBook.filters = [];
    thisBook.favoriteBooks = [];
    thisBook.initData();
    thisBook.getElements();
    thisBook.render();
  }

  initData() {
    const thisBook = this;
    thisBook.data = thisBook.dataSource.books;
  }

  getElements() {
    const thisBook = this;
    thisBook.bookList = document.querySelector('.books-list');
    thisBook.filtersForm = document.querySelector('.filters');
    thisBook.allBooks = document.querySelectorAll('.book');
    thisBook.templateValue = document.querySelector('#template-book').innerHTML;
    thisBook.compiledTemplate = Handlebars.compile(thisBook.templateValue);
  }

  render() {
    const thisBook = this;
    for (const book of thisBook.dataSource.books) {
      const ratingBgc = thisBook.determineRatingBgc(book.rating);
      const ratingWidth = (book.rating / 10) * 100;
      book.ratingWidth = ratingWidth;
      book.ratingBgc = ratingBgc;
      const generatedHTML = thisBook.compiledTemplate(book);
      const generatedDom = thisBook.utils.createDOMFromHTML(generatedHTML);

      thisBook.bookList.appendChild(generatedDom);
    }
    thisBook.allBooks = document.querySelectorAll('.book');
    thisBook.initActions();
  }

  initActions() {
    const thisBook = this;
    thisBook.bookList.addEventListener('dblclick', function (event) {
      event.preventDefault();
      const clickedBook = event.target.closest('.book');

      if (clickedBook) {
        const bookImage = clickedBook.querySelector('.book__image');
        const bookId = bookImage.dataset.id;
        bookImage.classList.toggle('favorite');

        if (!thisBook.favoriteBooks.includes(bookId)) {
          thisBook.favoriteBooks.push(bookId);
        } else {
          thisBook.favoriteBooks = thisBook.favoriteBooks.filter(
            (el) => el !== bookId
          );
        }
        console.log(thisBook.favoriteBooks);
      }
    });
    thisBook.filtersForm.addEventListener('click', function (event) {
      if (
        event.target.tagName === 'INPUT' &&
        event.target.type === 'checkbox' &&
        event.target.name === 'filter'
      ) {
        if (event.target.checked) {
          thisBook.filters.push(event.target.value);
        } else {
          thisBook.filters = thisBook.filters.filter(
            (el) => el !== event.target.value
          );
        }
      }
      thisBook.filterBooks();
    });
  }

  filterBooks() {
    const thisBook = this;
    for (const book of thisBook.allBooks) {
      const bookImage = book.querySelector('.book__image');
      const bookId = bookImage.dataset.id;
      const bookData = thisBook.dataSource.books.find(
        (book) => book.id == bookId
      );

      let shouldBeHidden = false;

      for (const filter of thisBook.filters) {
        if (!bookData.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if (shouldBeHidden) {
        bookImage.classList.add('hidden');
      } else {
        bookImage.classList.remove('hidden');
      }
    }
  }

  determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
}

new BooksList(dataSource, utils);
