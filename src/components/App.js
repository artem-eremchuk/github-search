import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Main from './Main/Main';
import Card from './Card/Card';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Main />
        </Route>
        <Route path='/card/:username/:reponame'>
          <Card />
        </Route>
        <Redirect to='/' />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
