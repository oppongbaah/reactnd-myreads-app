import React, {Component} from 'react';
import PropTypes from 'prop-types';

class selectBtn extends Component {

  constructor(props){
    super(props);
    this.allBooks = props.allBooks;
    this.book = props.book;
    this.onShelfChange = props.onShelfChange;
  }

  componentDidMount(){
    // this.getDefaultValue();
  }

  updateBookShelf = (e) => {
    this.onShelfChange(this.book, e.target.value);
  }

  getDefaultValue = (e) => {
    this.defaultVal = 'none';

    for (let item of this.allBooks){
      if (item.id === this.book.id) {
        this.defaultVal = item.shelf;
        break;
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

  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    book: PropTypes.object,
    onShelfChange: PropTypes.func.isRequired
  };
}

export default selectBtn;
