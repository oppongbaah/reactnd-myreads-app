import React, {Component} from 'react'
import Read from './Read';
import CurrentReading from './CurrentReading';
import WantToRead from './WantToRead';
import * as BooksAPI from '../data/BooksAPI';
import Loading from './Loading';
import SearchButton from './SearchBtn';

class homePage extends Component {
  // object variables
  shelfTitles = {
    read: "Read",
    currentlyReading: "Currently Reading",
    wantToRead: "Wants To Read"
  };
  shelfIDs = {
    read: "read",
    currentlyReading: "currentlyReading",
    wantToRead: "wantToRead"
  };
  appTitle = "My Reads App"
  // states
  state = {
    books: []
  };
  seachTitle = "Searcch a book";

  componentDidMount() {
    this._isMounted = true;
    this.getAllBooks();
  }

  componentDidUpdate() {
    this._isUpdated = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._isUpdated = false;
  }

  // functions
  getAllBooks = () => {
    BooksAPI.getAll()
    .then((allBooks) => {
      this.setState({
        books: allBooks
      })
    })
  }

  rotateBookShelf = (bookToMove, shelf) => {
    BooksAPI.update(bookToMove, shelf)
    .then( (req, res) => {
      bookToMove.shelf = shelf;
      this.setState(prevState => (
        {
          books: prevState.books.filter(book => (
            book.id !== bookToMove.id
          )).concat(bookToMove)
        }
      ))
    });
  }

  showSearchPage = () => {
    // alert('Hel');
  }

  render(){
    const {books} = this.state;
    if(this._isMounted) {
      return (
        <>
          <SearchButton searchTitle={this.searchTitle}
            onSearchBtnClicked={this.showSearchPage}>
          </SearchButton>
          <div className="list-books">
            <div className="list-books-title">
              <h1> {this.appTitle} </h1>
            </div>
            <CurrentReading allBooks={books} shelfTitle={this.shelfTitles.currentlyReading}
              shelfID={this.shelfIDs.currentlyReading} onShelfChange={this.rotateBookShelf}>
            </CurrentReading>
            <WantToRead allBooks={books} shelfTitle={this.shelfTitles.wantToRead}
              shelfID={this.shelfIDs.wantToRead} onShelfChange={this.rotateBookShelf}>
            </WantToRead>
            <Read allBooks={books} shelfTitle={this.shelfTitles.read}
              shelfID={this.shelfIDs.read} onShelfChange={this.rotateBookShelf}>
            </Read>
          </div>
        </>
      )
    }
    else {
      return (
        <Loading></Loading>
      )
    }
  }
}

export default homePage;
