import React from 'react'
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import Header from './component/Header';
import Index from './pages/Index';
import Login from './pages/Login';
import Footer from './component/Footer';
import Content from './pages/Content';
import Logout from './pages/Logout';

const withHeader = ['/my-profile', '/home', '/my-query', '/terms-condition', '/help', '/createQuery'];

const App = () => {
  const location = useLocation();
  return (
    <div>
      {
        withHeader.includes(location.pathname) && <Header />
      }
      <Switch>
        <Route exact path='/' component={Index} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/logout' component={Logout} />
        <Route exact path='/home' component={Content} />
        <Route exact path='/my-profile' component={Content} />
        <Route exact path='/home' component={Content} />
        <Route exact path='/selectCategory' component={Content} />
        <Route exact path='/my-query' component={Content} />
        <Route exact path='/terms-condition' component={Content} />
        <Route exact path='/help' component={Content} />
        <Route exact path='/createQuery' component={Content} />
        <Redirect to='/' />
      </Switch>
      {
        withHeader.includes(location.pathname) && <Footer />
      }

    </div>
  )
};

export default App;

