import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


import Header from './Header';
import Genres from './Genres'
import NewGender from './NewGender'
import EditGender from './EditGender'
import Serie from './Series'
import NewSerie from './NewSerie'
import InfoSerie from './InfoSerie'



const Home = () => {
  return <h1>Home</h1>
}

function App() {
 
  return (
    <Router>
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/generos'exact component={Genres} />
        <Route path='/generos/novo'exact component={NewGender} />
        <Route path='/generos/:id'exact component={EditGender} />
        <Route path='/series'exact component={Serie} />
        <Route path='/series/novo' exact component={NewSerie} />
        <Route path='/series/:id' exact component={InfoSerie} />

      </Switch>
    </div>
    </Router>
  );
}

export default App;
