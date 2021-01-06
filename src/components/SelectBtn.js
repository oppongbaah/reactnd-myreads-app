import React, {Component} from 'react';
import * as BooksAPI from '../data/BooksAPI';
import PropTypes from 'prop-types';

class selectBtn extends Component {

  constructor(props){
    super(props);
    this.allBooks = props.allBooks;
    this.book = props.book;
    this.onShelfChange = props.onShelfChange;
    this.defaultVal = 'none';
  }

  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  updateBookShelf = (e) => {
    if(this.book.hasOwnProperty('shelf')){
      this.onShelfChange(this.book, e.target.value);
    }
    else {
      // get that particualr book and add the shelf property
      BooksAPI.get(this.book.id).then(book => {
        this.onShelfChange(book, e.target.value);
      })
    }
  }

  getDefaultValue = (e) => {
    if(this.book.hasOwnProperty('shelf')) {
      for (let item of this.allBooks){
        if (item.id === this.book.id) {
          this.defaultVal = item.shelf;
          break;
        }
      }
    }
  }

  render() {
    this.getDefaultValue();
    return (
      <div className="book-shelf-changer">
        <select onChange={this.updateBookShelf} defaultValue={this.defaultVal}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default selectBtn;
