import Shelf from './BookShelf';

function read(props) {
  return (
    <Shelf allBooks={props.allBooks} shelfTitle={props.shelfTitle} shelfID={props.shelfID}></Shelf>
  )
}

export default read;
