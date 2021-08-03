import React, { useState, useEffect } from 'react';
import { AuthData } from '../helper/AuthData';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ToastMessage from '../helper/ToastMessage';
import QueryDetails from './QueryDetails';

const Home = (props) => {
    const history = useHistory();
    const userInfo = AuthData();

    const [user, setUser] = useState({
        FirstName: "",
        LastName: "",
        Image: "",
    });
    const [query, setQuery] = useState([]);
    const [like, setLike] = useState([]);
    const [queryId, setQueryId] = useState();

    const { FirstName, LastName, Image } = user;

    useEffect(() => {
        loadUserAndAllQuery();
    }, []);

    const loadUserAndAllQuery = async () => {
        let result = await axios.get(userInfo.apiUrl, { headers: userInfo.header });
        setUser(result.data.Data);
        let queryResult = await axios.get(`http://localhost:8080/voteme/query`, { headers: userInfo.header });
        const queryArray = queryResult.data.Data[0].Records;
        setQuery(queryArray);
        const likes = queryArray.map(obj => {
            return {
                _id: obj._id,
                TotalLikes: obj.TotalLikes,
                TotalDisLikes: obj.TotalDisLikes
            }
        });
        setLike(likes);
    };

    const createQuery = () => {
        history.push('/createQuery');
    }

    const addLikeOrDisLike = async (queryObj, index, queryFlag) => {
        const queryNewObj = { ...queryObj };
        const queryLike = {
            Like: queryFlag,
            LikedBy: user._id
        };
        let likeData;
        try {
            likeData = await axios.post(`http://localhost:8080/voteme/${queryObj._id}/likeordislike`, queryLike, { headers: userInfo.header });
            const likesArray = [...like];
            queryNewObj.TotalLikes = likeData.data.Data.Total.TotalLikes;
            queryNewObj.TotalDisLikes = likeData.data.Data.Total.TotalDisLikes;
            likesArray[index] = queryNewObj;
            setLike(likesArray);
        } catch (error) {
            if (likeData.data.Error) {
                ToastMessage(likeData.data.Error.Message, false);
            }
        }
    }

    const getQueryId = (queryId) => {
        queryId ? props.category(false) : props.category(true);
        setQueryId(queryId);
    }

    return (
        <div>
            {queryId && <QueryDetails data={() => { getQueryId() }} queryId={queryId} />}
            {!queryId &&
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
                                            {query.map((queryData, index) => (
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
                                                        <div className="submit-btn"><button type="submit" onClick={() => getQueryId(queryData._id)}>VOTE ME!</button></div>

                                                        <div className="bottom-right-options">
                                                            <span className="like" onClick={() => addLikeOrDisLike(queryData, index, true)}>
                                                                <img class="outline-icon" src="assets/images/up-arrow-outline.svg" alt="" />
                                                                <img className="fill-icon" src="assets/images/up-arrow-fill.svg" alt="" />
                                                                {like.find(likeObj => likeObj._id === queryData._id)?.TotalLikes || 0}</span>

                                                            <span className="dislike" onClick={() => addLikeOrDisLike(queryData, index, false)}>
                                                                <img class="outline-icon" src="assets/images/down-arrow-outline.svg" alt="" />
                                                                <img className="fill-icon" src="assets/images/down-arrow-fill.svg" alt="" />
                                                                {like.find(disLikeObj => disLikeObj._id === queryData._id)?.TotalDisLikes || 0}</span>

                                                            <span className="comments"><img src="assets/images/speech-bubble-outline.svg" alt="" /> {queryData.TotalComments}</span>
                                                            <span className="viewers"><img src="assets/images/view-outline.svg" alt="" /> {queryData.TotalViews}</span>
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
                </section>}
        </div >
    );
}

export default Home;