import React, { useState } from 'react';
import SideBar from '../component/SideBar';
import { Switch, Route, useLocation } from 'react-router-dom';
import MyProfile from '../pages/MyProfile';
import Home from '../pages/Home';
import MyQuery from '../pages/MyQuery';
import TermsCondition from '../pages/TermsCondition';
import Help from '../pages/Help'
import CreateQuery from '../pages/CreateQuery';
import Category from './Category';
import SelectCategory from './SelectCategory';
import AllQuery from './AllQuery';
const withHeader = ['/my-profile', '/home', '/my-query', '/terms-condition',
    '/help', '/createQuery', '/query/1', '/query/2', '/query/3', '/query/4'];

const Content = () => {
    const location = useLocation();
    const [category, setCategory] = useState(true);
    const categoryShowHide = (value) => {
        setCategory(value);
    };
    return (
        <div>
            <section className="query-banner-img">
                <div className="container">
                    {
                        location.pathname === '/home' && category === true && <Category />
                    }
                    <div className="query-inner d-flex">
                        {
                            withHeader.includes(location.pathname) && < SideBar />
                        }
                        <div className="right-container" >
                            <Switch>
                                <Route exact path='/createQuery' component={CreateQuery} />
                                <Route exact path='/my-profile' component={MyProfile} />
                                <Route exact path="/query/:id" component={AllQuery} />
                                <Route exact path='/home' render={(props) => <Home {...props} category={categoryShowHide} />} />
                                <Route exact path='/my-query' component={MyQuery} />
                                <Route exact path='/selectCategory' component={SelectCategory} />
                                <Route exact path='/terms-condition' component={TermsCondition} />
                                <Route exact path='/help' component={Help} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    )
};

export default Content;
