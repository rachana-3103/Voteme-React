import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthData } from '../helper/AuthData';
import { PieChart } from 'react-minimal-pie-chart';
import  BarChart from 'react-bar-chart';
import { Bar } from "react-chartjs-2";

const QueryEndDetails = (props) => {
    const userInfo = AuthData();
    const [query, setQuery] = useState({
        UserDetails: "",
        Category: [],
        Options: [],
    });
    const [data, setData] = useState([]);
    
    useEffect(() => {
        getQueryByQueryId();
    }, []);
    
    const getQueryByQueryId = async () => {
        const queryObj = await axios.get(`http://localhost:8080/voteme/querydetail/${props.data}`, { headers: userInfo.header });
        let data = [];
        queryObj.data.Data.Options.map((obj) => {
            var randomColor = "#000000".replace(/0/g, function () {
                return (~~(Math.random() * 16)).toString(16);
            });
            let insert = {
                color: randomColor,
                title: obj.Key,
                value: Number(obj.Percentage),
            };
            data.push(insert);
        });
        setData(data);
        setQuery(queryObj.data.Data);
    }

    const categoryArray = [];
    query.Category.forEach((category) => {
        categoryArray.push(category.CategoryName);
    });

    return (
        <div className="my-queries query-details-page">
            <h1 className="right-container-title" style={{ marginLeft: '15px' }}>Query Details</h1>
            <div className="query-info-box">
                <div className="query-head flex-box">
                    <span className="profile-img"><img src={query.UserDetails.Image} alt="" /></span>
                    <div className="about-query-info">
                        <div className="small-title">{query.UserDetails.FirstName} {query.UserDetails.LastName}<span className="credential-info">Engineer .</span></div>
                        <div className="query-shared-by">{categoryArray.join()}</div>
                    </div>
                </div>
                <div className="query-desc">
                    {console.log(query, '......................query')}
                    <h2 className="small-title">{query.Query}</h2>
                    <div className="query-chart">
                        <div class="voting-chart-cover">
                            <div class="chart-img">
                                {/* {query.ChartOption === '1' && 
                                <Bar
                                    ylabel='Quantity'
                                    style={{ top: 20, right: 20, bottom: 30, left: 40 }}
                                    width={500}
                                    height={500}
                                    data={[
                                        { text: 'Man', value: 500 },
                                        { text: 'Woman', value: 300 }
                                    ]}
                                />} */}
                                {query.ChartOption === '2' &&
                                    <PieChart
                                        style={{ height: '20%', width: '30%', marginLeft: '300px' }}
                                        // animate
                                        // animationDuration={200}
                                        // animationEasing="ease-out"
                                        // center={[50, 50]}
                                        // lengthAngle={360}
                                        // lineWidth={40}
                                        data={data}
                                        paddingAngle={0}
                                        radius={50}
                                        // rounded
                                        startAngle={0}
                                        viewBoxSize={[100, 100]}
                                        labelPosition={65}
                                        label={(data) => data.title}
                                        labelStyle={{
                                            fontSize: "20px",
                                            fontColor: "FFFFFA",
                                            fontWeight: "1500",
                                        }}
                                    />}
                                {/* {query.ChartOption === '3' && <img src="assets/images/lin-chart.jpg" alt="" />} */}
                                {/* {query.ChartOption === '4' && <img src="assets/images/donut-chart.png" alt="" />} */}

                                {/* <img src="assets/images/chart-img.png" alt="" /> */}
                            </div>
                            <div className="custom-select-box voting-box-show">
                                {query.Options.map((option) => (
                                    <div class="select-box-inner select-text">
                                        <div class="select-box-main voted">
                                            <div class="vote-count-box">{option.NumberOfVotes} Votes</div>
                                            <div class="d-flex"><span class="qry-opt">{option.Key}.</span><span>{option.Answer}</span></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="bottom-right-options">
                        <span className="like"><img className="outline-icon" src="assets/images/up-arrow-outline.svg" alt="" />
                            <img className="fill-icon" src="assets/images/up-arrow-fill.svg" alt="" /> {query.TotalLikes}</span>
                        <span className="dislike"><img className="outline-icon" src="assets/images/down-arrow-outline.svg" alt="" />
                            <img className="fill-icon" src="assets/images/down-arrow-fill.svg" alt="" />{query.TotalDisLikes}</span>
                        <span className="comments"><img src="assets/images/speech-bubble-outline.svg" alt="" /> {query.TotalComments}</span>
                        <span className="viewers"><img src="assets/images/view-outline.svg" alt="" /> {query.TotalViews}</span>
                    </div>
                </div>
                <div class="poll-end-time poll-ended">Poll Ended</div>
                <div className="right-vote-info">{query.TotalVotes} Votes</div>
                <div className="coment-section">
                    <div className="comment-section-inner flex-box">
                        <div className="comment-user-img"><img src="assets/images/profile-img.jpg" alt="" /></div>
                        <div className="comment-field flex-box">
                            <input type="text" placeholder="write your comments here...." name="" />
                            <div className="flex-box comment-option">
                                <span className="camera"><a href="/abc"><img src="assets/images/photo-camera.png" alt="" /></a></span>
                                <span className="emoji"><a href="/abc"><img src="assets/images/smile.png" alt="" /></a></span>
                                <button className="post-comment-btn" type="button"><i className="fa fa-paper-plane" aria-hidden="true"></i> Add Comment</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comments-list">
                    <div className="comments-list-inner">
                        <div className="query-head d-flex">
                            <span className="profile-img"><img src="assets/images/user-placeholder-img.jpg" alt="" /></span>
                            <div className="about-query-info">
                                <div className="small-title">John Doe <span className="credential-info">Businessman .</span></div>
                                <div className="query-shared-by">Hi, I am intrigued by the answer you gave. Do you have any research source that says these materials are more eco friendly? I adore these flooring options myself as I too am a Architect. But the thing is these natural stones are quarried from various mines. The whole process is very energy intensive. Not to mention, post quarrying phase where the stones are broken down is also energy intensive with a lot of wastage.</div>
                                <div className="comment-cta flex-box">
                                    <div className="comment-react flex-box"><img className="outline-icon" src="assets/images/like_outline-icon.svg" alt="" /><img className="fill-icon" src="assets/images/like_fill-icon.svg" alt="" /> Like . <span className="likes"> 8</span></div>
                                    <div className="comment-react flex-box"><span><img src="assets/images/replay-arrow.png" alt="" /></span> Reply</div>
                                </div>
                            </div>
                        </div>
                        <div className="comments-list-inner replay-comment">
                            <div className="query-head d-flex" style={{ marginBottom: '0px' }}>
                                <span className="profile-img"><img src="assets/images/profile-img.jpg" alt="" /></span>
                                <div className="about-query-info">
                                    <div className="small-title">John Doe <span className="credential-info">Businessman .</span></div>
                                    <div className="query-shared-by">Hi, I am intrigued by the answer you gave. Do you have any research source that says these materials are more eco friendly?</div>
                                    <div className="comment-cta flex-box">
                                        <div className="comment-react flex-box"><img className="outline-icon" src="assets/images/like_outline-icon.svg" alt="" /><img className="fill-icon" src="assets/images/like_fill-icon.svg" alt="" /> Like . <span className="likes"> 8</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </div>
        </div>
    );
}

export default QueryEndDetails;
