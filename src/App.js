import React from 'react'
import {
  Route,
  Routes,
} from 'react-router-dom';

import Index from './pages/Index';
import Login from './pages/Login';
import Content from './pages/Content';
import SelectCategory from './pages/SelectCategory';

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Index />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/logout' element={<Index data='logout' />} />
        <Route exact path='/addCategory' element={<SelectCategory />} />
        <Route path='*' element={<Content />} />
      </Routes>
    </div>
  )
};

export default App;

