import SelectButton from './SelectBtn';

function bookShelf(props) {

  for(let book of props.allBooks) {
    if(!book.hasOwnProperty('imageLinks')){
      book.imageLinks = {
        smallThumbnail: '',
        thumbnail: ''
      };
    }
  }

  return (
    <div className="list-books-content">
      <div className="bookshelf">
        <h2 className="bookshelf-title"> {props.shelfTitle} </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              props.allBooks
              .filter(book => book.shelf === props.shelfID)
              .map(filteredBook => (
                 <li key={filteredBook.authors}>
                   <div className="book">
                     <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193,
                           backgroundImage: `url(${filteredBook.imageLinks.smallThumbnail})` }}>
                        </div>
                        <SelectButton allBooks={props.allBooks} book={filteredBook}
                          onShelfChange={props.onShelfChange}>
                        </SelectButton>
                     </div>
                     <div className="book-title">{filteredBook.title}</div>
                     <div className="book-authors">{filteredBook.authors}</div>
                   </div>
                 </li>
              ))
            }
          </ol>
        </div>
      </div>
    </div>
  )
}

export default bookShelf;
