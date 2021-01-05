import SelectButton from './SelectBtn';

function bookShelf(props) {
  return (
    <div className="list-books-content">
      <div className="bookshelf">
        <h2 className="bookshelf-title"> {props.shelfTitle} </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              props.allBooks
              .filter(book => book.shelf === props.shelfID)
              .map(readBook => (
                 <li key={readBook.authors}>
                   <div className="book">
                     <div className="book-top">
                       <div className="book-cover" style={{ width: 128, height: 193,
                           backgroundImage: `url(${readBook.imageLinks.smallThumbnail})` }}></div>
                       <SelectButton></SelectButton>
                     </div>
                     <div className="book-title">{readBook.title}</div>
                     <div className="book-authors">{readBook.authors}</div>
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
