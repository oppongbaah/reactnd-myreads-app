import Shelf from './BookShelf';

function wantToRead(props) {
  return (
    <Shelf allBooks={props.allBooks} shelfTitle={props.shelfTitle} shelfID={props.shelfID}></Shelf>
  )
}

export default wantToRead;
