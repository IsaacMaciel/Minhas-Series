import React from 'react';

import Header from './Header';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import axios from 'axios';
import { useState,useEffect } from 'react';

import Genres from './Genres'
import NewGender from './NewGender'
import EditGender from './EditGender'



const Home = () => {
  return <h1>Home</h1>
}

function App() {
  const [data,setData] = useState({});

  useEffect( () => {
    axios.get('/api').then( resp => {
      setData(resp.data)
    })
  },[])

  return (
    <Router>
    <div>
      <Header/>
      <Route path='/' exact component={Home} />
      <Route path='/generos'exact component={Genres} />
      <Route path='/generos/:id'exact component={EditGender} />
      <Route path='/generos/novo'exact component={NewGender} />
    </div>
    </Router>
  );
}

export default App;
