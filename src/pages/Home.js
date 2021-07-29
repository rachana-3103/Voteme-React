import React, { useState, useEffect } from 'react';
import { AuthData } from '../helper/AuthData';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();
    const userInfo = AuthData();

    const [user, setUser] = useState({
        FirstName: "",
        LastName: "",
        Image: "",
    });

    const [query, setQuery] = useState([]);
    const { FirstName, LastName, Image } = user;
    const {queryData , setQueryData} = useState({
        TotalLikes: 
    });

    useEffect(() => {
        loadUserAndAllQuery();
    }, []);

    const loadUserAndAllQuery = async () => {
        let result = await axios.get(userInfo.apiUrl, { headers: userInfo.header });
        setUser(result.data.Data);
        let queryResult = await axios.get(`http://localhost:3000/voteme/query`, { headers: userInfo.header });
        setQuery(queryResult.data.Data[0].Records);
        queryResult.data.Data[0].Records.array.forEach(element => {
            
        });
    };
    const createQuery = () => {
        history.push('/createQuery');
    }
    const addLike = async (queryId, likes) => {
        const queryLike = {
            Like: true,
            LikedBy: user._id
        }
        console.log(queryLike, '.................', queryId, '..........likes', likes);
        setQuery({
            likeActive: !this.state.likeActive,
            like: this.state.likeActive ? this.state.like - 1 : this.state.like + 1
          });
        return await axios.post(`http://localhost:3000/voteme/${queryId}/likeordislike`,
            queryLike,
            { headers: userInfo.header });
      
    }
    return (
        <div>
            <section className="query-banner-img add-cat-page">
                <div className="container">
                    <div className="query-inner d-flex">
                        <div className="my-queries">
                            <div className="tabs-content-cover">
                                <div className="tab-content-list">
                                    <div className="query-info-box write-query-box">
                                        <div className="query-head flex-box">
                                            <span className="profile-img"><img src={Image} alt="" /></span>
                                            <div className="about-query-info">
                                                <div className="small-title">{FirstName} {LastName}</div>
                                            </div>
                                        </div>
                                        <div className="small-title" onClick={createQuery}>Write Your Query Here...</div>
                                    </div>
                                    <div className="tab-content-list">
                                        {query.map((queryData) => (
                                            <div className="query-info-box">
                                                <div className="query-head flex-box">
                                                    <span className="profile-img"><img src={queryData.UserDetails[0].Image} alt="" /></span>
                                                    <div className="about-query-info">
                                                        <div className="small-title">{queryData.UserDetails[0].FirstName} {queryData.UserDetails[0].LastName}</div>
                                                        {queryData.Category.map((category) => (
                                                            <div className="query-shared-by">{category}</div>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="query-desc">
                                                    <h2 className="small-title">{queryData.Query}</h2>
                                                    {queryData.Options[0].Options.map((option) => (
                                                        <ul className="query-options">
                                                            <li>{option.Key}. {option.Answer} </li>
                                                        </ul>
                                                    ))}
                                                </div>
                                                <div className="query-footer flex-box">
                                                    <div className="submit-btn"><button type="button">VOTE ME!</button></div>
                                                    <div className="bottom-right-options">
                                                        <span className="like" onClick={() => addLike(queryData._id, queryData.TotalLikes)}>
                                                            <img class="outline-icon" src="assets/images/up-arrow-outline.svg" alt="" />
                                                            <img className="fill-icon" src="assets/images/up-arrow-fill.svg" alt="" /> {queryData.TotalLikes}</span>
                                                        <span className="dislike"><img class="outline-icon" src="assets/images/down-arrow-outline.svg" alt="" />
                                                            <img className="fill-icon" src="assets/images/down-arrow-fill.svg" alt="" /> {queryData.TotalDisLikes}</span>
                                                        <span className="comments"><img src="assets/images/speech-bubble-outline.svg" alt="" /> {queryData.TotalComments}</span>
                                                        <span className="viewers"><img src="assets/images/view-outline.svg" alt="" /> {queryData.TotalViews}</span>
                                                        {/* <span className="share"><img src="assets/images/share-outline.svg" alt="" /> 50</span> */}
                                                        {/* <span className="more-opt">
                                                            <img src="assets/images/more.png" alt="" />
                                                            <div className="report-pop">
                                                                <a href="/abc">Report</a>
                                                            </div>
                                                        </span> */}
                                                    </div>
                                                </div>
                                                <div className="poll-end-time">Will be end within 2 Days</div>
                                                <div className="right-vote-info">20 Votes</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;