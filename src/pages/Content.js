import React, { useState } from 'react';
import SideBar from '../component/SideBar';
import { Routes, Route, useLocation } from 'react-router-dom';
import MyProfile from '../pages/MyProfile';
import Home from '../pages/Home';
import MyQuery from '../pages/MyQuery';
import TermsCondition from '../pages/TermsCondition';
import QueryEndDetails from '../pages/QueryEndDetails';
import Help from '../pages/Help'
import CreateQuery from '../pages/CreateQuery';
import Category from './Category';
import SelectCategory from './SelectCategory';
import AllQuery from './AllQuery';
import Layout from '../component/Layout';
import QueryDetails from './QueryDetails';

const withHeader = ['/my-profile', '/home', '/queryDetails', '/queryEndDetails', '/my-query', '/terms-condition',
    '/help', '/createQuery', '/query/all', '/query/recent', '/query/top-10', '/query/popular'];

const Content = () => {
    const location = useLocation();
    const [category, setCategory] = useState(true);
    const [data, setData] = useState(null);

    const CategoryShowHide = (value) => {
        setCategory(value);
    };
    const QueryData = async (data) => {
        setData(data);
    }
    return (
        <Layout>
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
                            <Routes>
                                <Route exact path='/createQuery' element={<CreateQuery />} />
                                <Route exact path='/my-profile' element={<MyProfile />} />
                                <Route exact path='/queryDetails' element={<QueryDetails data={data} />} />
                                <Route exact path='/queryEndDetails' element={<QueryEndDetails data={data} />} />
                                <Route exact path="/query/:id" element={<AllQuery />} />
                                <Route exact path='/home' element={<Home QueryData={QueryData} CategoryShowHide={CategoryShowHide} />} />
                                <Route exact path='/my-query' element={<MyQuery />} />
                                <Route exact path='/selectCategory' element={<SelectCategory />} />
                                <Route exact path='/terms-condition' element={<TermsCondition />} />
                                <Route exact path='/help' element={<Help />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    )
};

export default Content;
