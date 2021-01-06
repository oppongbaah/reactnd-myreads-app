import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../data/BooksAPI';
import SelectButton from './SelectBtn';

class search extends Component {

  constructor(props){
    super(props);

    this.state = {
      query: '',
      queryString: '',
      booksRetrieved: [],
      errorOnSearch: false,
    }
  }

  updateQueryState = (_event) => {
    _event.preventDefault();
    this.state.queryString = _event.target.value;
    this.setState( { query:  _event.target.value})
  }

  retrieveBooks = (_event) => {
    this.updateQueryState(_event);
    BooksAPI.search(this.state.queryString.trim())
    .then(books => {
      if(books.length > 0){
        for(let book of books) {
          if(!book.hasOwnProperty('imageLinks')){
            book.imageLinks = {
              smallThumbnail: '',
              thumbnail: ''
            };
          }
        }
        this.setState( { booksRetrieved: books, errorOnSearch: false} )
      }
      else {
        this.setState( { booksRetrieved: books, errorOnSearch: true} )
      }
    })
    .catch(e => {
      this.setState( { booksRetrieved: [] } );
    })
  }

  searchBooks = (e) => {
    this.retrieveBooks(e);
  }

  rotateBookShelf = (bookToMove, shelf) => {
    BooksAPI.update(bookToMove, shelf)
    .then( (req, res) => {
      bookToMove.shelf = shelf;
      this.setState(prevState => (
        {
          booksRetrieved: prevState.booksRetrieved.filter(book => (
            book.id !== bookToMove.id
          )).concat(bookToMove)
        }
      ))
    });
  }

  render() {
    const {query, booksRetrieved, errorOnSearch} = this.state;

    for(let book of this.state.booksRetrieved) {
      if(!book.hasOwnProperty('imageLinks')){
        book.imageLinks = {
          smallThumbnail: '',
          thumbnail: ''
        };
      }
    }

    return (
      <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/" ></Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"
                value={query} onChange={this.searchBooks}/>
            </div>
          </div>
          <div className="search-books-results">
          {
            !errorOnSearch && (
              <div>
                <h3>Search returned {booksRetrieved.length} books </h3>
                <ol className="books-grid">
                  {
                    booksRetrieved.map(book => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193,
                                backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                            </div>
                            <SelectButton allBooks={booksRetrieved} book={book}
                              onShelfChange={this.rotateBookShelf}>
                            </SelectButton>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                    ))
                  }
                </ol>
              </div>
            )}
            {
              errorOnSearch && (
              <h3>Search did not return any books. Please try again!</h3>
              )
            }
          </div>
      </div>
    )
  }
}

export default search;
