import { Link } from 'react-router-dom'

function searchBtn(props) {
  return (
    <div className="open-search">
      <Link to="/search" onClick={props.onSearchBtnClicked}>{props.searchTitle}</Link>
    </div>
  )
}

export default searchBtn;
