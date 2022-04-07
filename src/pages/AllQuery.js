import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { AuthData } from '../helper/AuthData';

const AllQuery = () => {
    const location = useLocation();
    const userInfo = AuthData();
    const { id } = useParams();
    let percentage = 0;
    const [query, setQuery] = useState([]);
    useEffect(() => {
        loadQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadQuery = async () => {
        const query = await axios.get(`http://localhost:8080/voteme/query?searchBy=${id}`, { headers: userInfo.header })
        setQuery(query.data.Data[0].Records);
    }

    return (
        <div>
            <div className="my-queries">
                <div className="query-tabing">
                    <div className="tab-listing">
                        <ul className="tabbing-nav">
                            <li className={location.pathname === "/query/1" ? "active-tab" : ""}><Link to={`/query/${1}`}>All Queries</Link></li>
                            <li className={location.pathname === "/query/2" ? "active-tab" : ""}><Link to={`/query/${2}`} >Recent Queries</Link></li>
                            <li className={location.pathname === "/query/3" ? "active-tab" : ""}><Link to={`/query/${3}`}>Top 10 Queries</Link></li>
                            <li className={location.pathname === "/query/4" ? "active-tab" : ""}><Link to={`/query/${4}`} >Popular Queries</Link></li>
                        </ul>
                    </div>
                    <div className="tabs-content-cover">
                        <div id="recent-queries" className="tab-content">
                            {query.map((queryObj) => (
                                <div className="tab-content-list">
                                    <div className="query-info-box">
                                        <div className="query-head flex-box">
                                            <span className="profile-img"><img src={queryObj.UserDetails[0].Image} alt="" /></span>
                                            <div className="about-query-info">
                                                <div className="small-title">{queryObj.UserDetails[0].FirstName} {queryObj.UserDetails[0].LastName}</div>
                                                <div className="query-shared-by">{queryObj.Category.join()}</div>
                                            </div>
                                        </div>
                                        <div className="query-desc">
                                            <h2 className="small-title">{queryObj.Query}</h2>
                                            <ul className="query-options">
                                                {queryObj.Options[0].Options.map((option) => (
                                                    <li>{option.Key}. {option.Answer}
                                                        {option.Percentage === null ?
                                                            (<span className="opt-a">
                                                                <span className="graph-line"></span> {percentage} %
                                                            </span>) :
                                                            (<span className="opt-a">
                                                                <span className="graph-line"></span> {option.Percentage} %
                                                            </span>)}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="query-footer flex-box">
                                            <div className="vote-count">{queryObj.TotalVotes} Votes</div>
                                            <div className="bottom-right-options">
                                                <span className="like">
                                                    <img className="outline-icon" src="assets/images/up-arrow-outline.svg" alt="" />
                                                    <img className="fill-icon" src="assets/images/up-arrow-fill.svg" alt="" />{queryObj.TotalLikes}</span>
                                                <span className="dislike">
                                                    <img className="outline-icon" src="assets/images/down-arrow-outline.svg" alt="" />
                                                    <img className="fill-icon" src="assets/images/down-arrow-fill.svg" alt="" /> {queryObj.TotalDisLikes}</span>
                                                <span className="comments"><img src="assets/images/speech-bubble-outline.svg" alt="" />{queryObj.TotalComments}</span>
                                                <span className="viewers"><img src="assets/images/view-outline.svg" alt="" />{queryObj.TotalViews}</span>
                                            </div>
                                        </div>
                                        <div className="poll-end-time">Pole End Time {queryObj.EndDate}</div>
                                    </div>
                                    <div className="poll-end-time poll-ended">Poll Ended</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllQuery;
