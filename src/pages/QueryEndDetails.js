import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthData } from '../helper/AuthData';
import { useNavigate } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import ToastMessage from "../helper/ToastMessage";

const QueryEndDetails = (props) => {
    const navigate = useNavigate();
    if (props.data) {
        localStorage.setItem("query", JSON.stringify(props.data));
    }
    const id = JSON.parse(localStorage.getItem("query"));
    const userInfo = AuthData();
    const [comment, setComment] = useState();
    const [getComment, setGetComment] = useState();
    const [like, setLike] = useState([]);
    const [user, setUser] = useState({
        FirstName: "",
        LastName: "",
        Image: "",
        _id: ''
    });
    const [query, setQuery] = useState({
        UserDetails: "",
        Category: [],
        Options: [],
    });
    const [data, setData] = useState([]);
    const loadUser = async () => {
        let result = await axios.get(userInfo.apiUrl, { headers: userInfo.header });
        setUser(result.data.Data);
    }
    useEffect(() => {
        getQueryByQueryId();
        getCommentById();
        loadUser();
    }, []);

    const getQueryByQueryId = async () => {
        const queryObj = await axios.get(`http://localhost:8080/voteme/querydetail/${id}`, { headers: userInfo.header });
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
    const getCommentById = async () => {
        const commentObj = await axios.get(`http://localhost:8080/voteme/${id}/getComments`, { headers: userInfo.header });
        if (commentObj.data.data[0].Records[0] && commentObj.data.data[0].Records[0].replay.length > 0) {
            setGetComment(commentObj.data.data[0].Records[0].replay);
        } else {
            setGetComment([]);
        }
    }
    const onInputChange = (e) => {
        setComment(e.target.value);
    };

    const addComment = async (Comment, queryId, userId) => {
        const body = { Comment:Comment, CommentedBy: userId }
        const addCommentData = await axios.post(`http://localhost:8080/voteme/${queryId}/createComments`,
            body, { headers: userInfo.header });
        if (addCommentData.data.Error) {
            ToastMessage(addCommentData.data.Error.Message, false);
        }
        setComment('');
        getQueryByQueryId();
        getCommentById();
    }

    const likeDislikeComment = async (queryId, userId, commentId) => {
        const body = { Like: true, LikedBy: userId }
        const obj = await axios.post(`http://localhost:8080/voteme/${queryId}/comment/${commentId}/likeordislike`,
            body, { headers: userInfo.header });
        if (obj.data.message) {
            ToastMessage(obj.data.message, true);
        } else {
            ToastMessage(obj.data.Error.Message, false);
        }
        getQueryByQueryId();
        getCommentById();
    }

    const addLikeOrDisLike = async (query, queryFlag) => {
        let likeData;
        const queryNewObj = { ...query };
        const queryLike = {
            Like: queryFlag,
            LikedBy: user._id,
        };
        try {
            likeData = await axios.post(
                `http://localhost:8080/voteme/${query.QueryId}/likeordislike`,
                queryLike,
                { headers: userInfo.header }
            );
            let likesArray = [...like];
            queryNewObj.TotalLikes = likeData.data.Total.TotalLikes;
            queryNewObj.TotalDisLikes = likeData.data.Total.TotalDisLikes;
            likesArray = queryNewObj;
            setLike(likesArray);
        } catch (error) {
            if (likeData.data.Error) {
                ToastMessage(likeData.data.Error.Message, false);
            }
        }
        await getQueryByQueryId();
    };
    const deleteComment = async (queryId, commentId) => {
        const obj = await axios.delete(`http://localhost:8080/voteme/${queryId}/comment/${commentId}`, { headers: userInfo.header });
        if (obj.data.message) {
            ToastMessage(obj.data.message, true);
        }
        await getCommentById();
        await getQueryByQueryId();
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
                                        data={data}
                                        paddingAngle={0}
                                        radius={50}
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
                        <span className="like" onClick={() => addLikeOrDisLike(query, true)
                        }><img className="outline-icon" src="assets/images/up-arrow-outline.svg" alt="" />
                            <img className="fill-icon" src="assets/images/up-arrow-fill.svg" alt="" /> {query.TotalLikes}</span>
                        <span className="dislike" onClick={() => addLikeOrDisLike(query, false)
                        }><img className="outline-icon" src="assets/images/down-arrow-outline.svg" alt="" />
                            <img className="fill-icon" src="assets/images/down-arrow-fill.svg" alt="" />{query.TotalDisLikes}</span>
                        <span className="comments"><img src="assets/images/speech-bubble-outline.svg" alt="" /> {query.TotalComments}</span>
                        <span className="viewers"><img src="assets/images/view-outline.svg" alt="" /> {query.TotalViews}</span>
                    </div>
                </div>
                <div class="poll-end-time poll-ended">Poll Ended</div>
                <div className="right-vote-info">{query.TotalVotes} Votes</div>
                <div className="coment-section">
                    <div className="comment-section-inner flex-box">
                        <div className="comment-user-img"><img src={userInfo.image} alt="" /></div>
                        <div className="comment-field flex-box">
                            <input type="text" placeholder="write your comments here...." name="Comment" value={comment}
                                onChange={onInputChange} />
                            <div className="flex-box comment-option">
                                <span className="camera"><a href="/"><img src="assets/images/photo-camera.png" alt="" /></a></span>
                                <span className="emoji"><a href="/"><img src="assets/images/smile.png" alt="" /></a></span>
                                <button className="post-comment-btn" type="button"
                                    onClick={() => addComment(comment, query.QueryId, userInfo.id)}>
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                    Add Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comments-list">
                    {  getComment && getComment.length > 0 ? getComment.map((comment) => (
                        <div className="comments-list-inner">
                            <div className="query-head d-flex">
                                <span className="profile-img"><img src={comment.UserDetails[0].Image} alt="" /></span>
                                <div className="about-query-info">
                                    <div className="small-title">{comment.UserDetails[0].FirstName} {comment.UserDetails[0].LastName}
                                        <span className="credential-info">Engineer.</span></div>

                                    <div className="query-shared-by">{comment.Comment}</div>
                                    <div className="comment-cta flex-box">
                                        <div className="comment-react flex-box"
                                            onClick={() => likeDislikeComment(query.QueryId, userInfo.id, comment._id)}>
                                            <img className="outline-icon" src="assets/images/like_outline-icon.svg" alt="" />
                                            <img className="fill-icon" src="assets/images/like_fill-icon.svg" alt="" />Like. &nbsp;
                                            <span className="likes"> {comment.TotalLikes}</span>
                                        </div>
                                        <div>
                                            <i class="material-icons" style={{ cursor: 'pointer' }}
                                                onClick={() => { deleteComment(query.QueryId, comment._id) }}>delete</i>
                                        </div>
                                        {/* <div className="comment-react flex-box"><span>
                                            <img src="assets/images/replay-arrow.png" alt="" /></span> Reply</div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )):<div>No Comment Found</div>}
                </div >
            </div>
        </div>
    );
}

export default QueryEndDetails;
