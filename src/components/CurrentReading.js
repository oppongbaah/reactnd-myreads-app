import Shelf from './BookShelf';

function currentReading(props) {
  return (
    <Shelf allBooks={props.allBooks} shelfTitle={props.shelfTitle}
      shelfID={props.shelfID} onShelfChange={props.onShelfChange}>
    </Shelf>
  )
}

export default currentReading;
