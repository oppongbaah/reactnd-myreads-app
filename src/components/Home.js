import React, {Component} from 'react'
import Read from './Read';
import CurrentReading from './CurrentReading';
import WantToRead from './WantToRead';
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
  seachTitle = "Searcch a book";

  showSearchPage = () => {
    // alert('Hel');
  }

  render() {
    const books = this.props.books;

    return (
      <>
        <SearchButton searchTitle={this.searchTitle}
          onSearchBtnClicked={this.showSearchPage} books={books}>
        </SearchButton>
        <div className="list-books">
          <div className="list-books-title">
            <h1> {this.appTitle} </h1>
          </div>
          <CurrentReading allBooks={books} shelfTitle={this.shelfTitles.currentlyReading}
            shelfID={this.shelfIDs.currentlyReading} onShelfChange={this.props.rotateShelf}>
          </CurrentReading>
          <WantToRead allBooks={books} shelfTitle={this.shelfTitles.wantToRead}
            shelfID={this.shelfIDs.wantToRead} onShelfChange={this.props.rotateShelf}>
          </WantToRead>
          <Read allBooks={books} shelfTitle={this.shelfTitles.read}
            shelfID={this.shelfIDs.read} onShelfChange={this.props.rotateShelf}>
          </Read>
        </div>
      </>
    )
  }
}

export default homePage;
