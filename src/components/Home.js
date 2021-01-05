import React, {Component} from 'react'
import Read from './Read';
import CurrentReading from './CurrentReading';
import WantToRead from './WantToRead';
import * as BooksAPI from '../data/BooksAPI';
import Loading from './Loading';

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

  componentDidMount() {
    this._isMounted = true;
    this.getAllBooks();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render(){
    //
    const {books} = this.state;
    //
    if(this._isMounted) {
      console.log(books);
      return (
        <>
        <div className="list-books">
          <div className="list-books-title">
            <h1> {this.appTitle} </h1>
          </div>
          <CurrentReading allBooks={books} shelfTitle={this.shelfTitles.currentlyReading}
            shelfID={this.shelfIDs.currentlyReading}></CurrentReading>
          <WantToRead allBooks={books} shelfTitle={this.shelfTitles.wantToRead}
            shelfID={this.shelfIDs.wantToRead}></WantToRead>
          <Read allBooks={books} shelfTitle={this.shelfTitles.read} shelfID={this.shelfIDs.read}></Read>
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
