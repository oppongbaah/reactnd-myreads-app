import React, {Component, Suspense, lazy} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';
import * as BooksAPI from './data/BooksAPI';
import Loading from './components/Loading';

const HomePage = lazy(() => import('./components/Home'));
const SearchPage = lazy(() => import('./components/Search'));

class App extends Component {

  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks();
    this._isMounted = true;
  }

  componentDidUpdate() {
    this._isUpdated = true;
  }

  rotateBookShelf = (bookToMove, shelf) => {
    BooksAPI.update(bookToMove, shelf)
    .then( (req, res) => {
      bookToMove.shelf = shelf;
      this.setState(prevState => (
        {
          books: prevState.books.filter(book => (
            book.id !== bookToMove.id
          )).concat(bookToMove),
          shelf: bookToMove.shelf
        }
      ))
    });
  }

  updateBooks = () => {
    console.log(this.state.query);
    BooksAPI.search(this.state.query.trim())
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
        this.setState( { books: books, errorOnSearch: false} )
      }
      else {
        this.setState( { books: [], errorOnSearch: true} )
      }
    })
  }

  getAllBooks = () => {
    BooksAPI.getAll()
    .then((allBooks) => {
      this.setState({
        books: allBooks
      })
    })
  }

  render() {

    if(this._isMounted) {
      return (
        <div className="app">
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" render={ () =>
                    (<HomePage {...this.state} rotateShelf={this.rotateBookShelf}/>) }/>
                <Route path="/search" render={ () =>
                    (<SearchPage {...this.state} rotateShelf={this.rotateBookShelf}/>) }/>
              </Switch>
            </Suspense>
          </Router>
        </div>
      )
    }
    else {
      return (
        <Loading></Loading>
      )
    }
  }

}

export default App;
