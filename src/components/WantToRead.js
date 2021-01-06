import Shelf from './BookShelf';

function wantToRead(props) {
  return (
    <Shelf allBooks={props.allBooks} shelfTitle={props.shelfTitle}
      shelfID={props.shelfID} onShelfChange={props.onShelfChange}>
    </Shelf>
  )
}

export default wantToRead;
