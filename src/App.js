import React, {Component, Suspense, lazy} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/App.css';

const Home = lazy(() => import('./components/Home'));
const Search = lazy(() => import('./components/Search'));

class App extends Component{

  render() {
    return (
      <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/search" component={Search}/>
          </Switch>
        </Suspense>
      </Router>
      </>
    )
  }
}

export default App;
