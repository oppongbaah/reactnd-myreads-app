import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../data/BooksAPI';
import SelectButton from './SelectBtn';

class search extends Component {

  state = {
    retrievedBooks: [],
    query: '',
    errorOnSearch: false
  }

  updateQueryState = (_event) => {
    this.setState( { query:  _event.target.value}, this.retrieveBooks)
  }

  retrieveBooks = (_event) => {
    if(this.state.query){
      BooksAPI.search(this.state.query.trim())
      .then(newBooks => {
        if(newBooks.length > 0){
          for(let book of newBooks) {
            if(!book.hasOwnProperty('imageLinks')){
              book.imageLinks = {
                smallThumbnail: '',
                thumbnail: ''
              };
            }
            // check for title as well
            if(!book.hasOwnProperty('title')){
              book.title = 'No book Title'
            }
          }
          this.setState( { retrievedBooks: newBooks, errorOnSearch: false} )
        }
        else {
          this.setState( { retrievedBooks: [], errorOnSearch: true} )
        }
      })
      .catch(e => {})
    }
  }

  searchBooks = (e) => {
    this.updateQueryState(e);
  }

  render() {
    const {retrievedBooks, query, errorOnSearch} = this.state;

    if(!errorOnSearch){
      for(let book of retrievedBooks) {
        if(!book.hasOwnProperty('imageLinks')){
          book.imageLinks = {
            smallThumbnail: '',
            thumbnail: ''
          };
        }
        // check for title as well
        if(!book.hasOwnProperty('title')){
          book.title = 'No book Title'
        }
      }
    }

    return (
      <div className="search-books">
          <div className="search-books-bar">
            <Link className="close-search" to="/" ></Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author"
                value={query}  onChange={this.searchBooks.bind(this)}/>
            </div>
          </div>
          <div className="search-books-results">
          {
            (!errorOnSearch & query.trim() !== '')  ? (
              <div>
                <h3>Search returned {retrievedBooks.length} books </h3>
                <ol className="books-grid">
                  {
                    retrievedBooks.map(book => (
                      <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193,
                                backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}>
                            </div>
                            <SelectButton allBooks={this.props.books}
                              onShelfChange={this.props.rotateShelf} book={book}>
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
            ): null }
            {
              errorOnSearch ? (
              <h3>Search did not return any books. Please try again!</h3>
              ) : null
            }
          </div>
      </div>
    )
  }
}

export default search;
