import React from 'react'
import {
  Route,
  Routes,
  //  useLocation
} from 'react-router-dom';

// import Header from './component/Header';
import Index from './pages/Index';
import Login from './pages/Login';
// import Footer from './component/Footer';
import Content from './pages/Content';
import Logout from './pages/Logout';
import SelectCategory from './pages/SelectCategory';

// const withHeader = ['/my-profile', '/home', '/my-query', '/terms-condition',
//   '/help', '/createQuery', '/query/1', '/query/2', '/query/3', '/query/4'];

const App = () => {
  // const location = useLocation();
  return (
    <div>
      {/* {
        withHeader.includes(location.pathname) && <Header />
      } */}
      <Routes>
        <Route exact path='/' element={<Index />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/logout' element={<Logout />} />
        <Route exact path='/addCategory' element={<SelectCategory />} />
        <Route path='*' element={<Content />} />
        {/* <Route exact path="/query/:id" element={<Content />} />
        <Route exact path='/my-profile' element={<Content />} />
        <Route exact path='/home' element={<Content/>} />
        <Route exact path='/selectCategory' element={<Content/>} />
        <Route exact path='/my-query' element={<Content/>} />
        <Route exact path='/terms-condition' element={<Content/>} />
        <Route exact path='/help' element={<Content/>} />
        <Route exact path='/createQuery' element={<Content/>} /> */}
        {/* <Navigate to='/' /> */}
      </Routes>
      {/* {
        withHeader.includes(location.pathname) && <Footer />
      } */}

    </div>
  )
};

export default App;

