import React, { useState, useEffect } from "react";
import { AuthData } from "../helper/AuthData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../helper/ToastMessage";
import moment from "moment";

const Home = (props) => {
  const navigate = useNavigate();
  const userInfo = AuthData();
  let percentage = 0;

  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Image: "",
  });
  const [query, setQuery] = useState([]);
  const [like, setLike] = useState([]);
  const [queryId, setQueryId] = useState(null);
  const [viewQuery, setViewQuery] = useState(false);
  const { FirstName, LastName, Image } = user;

  useEffect(() => {
    loadUserAndAllQuery();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadUserAndAllQuery = async () => {
    let result = await axios.get(userInfo.apiUrl, { headers: userInfo.header });
    setUser(result.data.Data);
    let queryResult = await axios.get(`http://localhost:8080/voteme/query`, {
      headers: userInfo.header,
    });
    const queryArray = queryResult.data.Data[0].Records;
    setQuery(queryArray);
    const likes = queryArray.map((obj) => {
      return {
        _id: obj._id,
        TotalLikes: obj.TotalLikes,
        TotalDisLikes: obj.TotalDisLikes,
      };
    });
    setLike(likes);
  };

  const createQuery = () => {
    navigate("/createQuery");
  };

  const addLikeOrDisLike = async (queryObj, index, queryFlag) => {
    let likeData;
    const queryNewObj = { ...queryObj };
    const queryLike = {
      Like: queryFlag,
      LikedBy: user._id,
    };
    try {
       likeData = await axios.post(
        `http://localhost:8080/voteme/${queryObj._id}/likeordislike`,
        queryLike,
        { headers: userInfo.header }
      );
      const likesArray = [...like];

      queryNewObj.TotalLikes = likeData.data.Total.TotalLikes;
      queryNewObj.TotalDisLikes = likeData.data.Total.TotalDisLikes;
      likesArray[index] = queryNewObj;
      setLike(likesArray);
    } catch (error) {
      if (likeData.data.Error) {
        ToastMessage(likeData.data.Error.Message, false);
      }
    }
  };

  const getQueryById = async (query) => {
    await axios.get(
      `http://localhost:8080/voteme/${query._id}/queryview/${userInfo.id}`,
      { headers: userInfo.header }
    );
    queryId ? props.CategoryShowHide(false) : props.CategoryShowHide(true);
    setQueryId(query);
    props.QueryData(query);
    navigate('/queryDetails')
  };

  const viewQueryId = async (queryId) => {
    setQueryId(queryId);
    setViewQuery(true);
  };

  return (
    <div>
      {!queryId && (
        <section className="query-banner-img add-cat-page">
          <div className="container">
            <div className="query-inner d-flex">
              <div className="my-queries">
                <div className="tabs-content-cover">
                  <div className="tab-content-list">
                    <div className="query-info-box write-query-box">
                      <div className="query-head flex-box">
                        <span className="profile-img">
                          <img src={Image} alt="" />
                        </span>
                        <div className="about-query-info">
                          <div className="small-title">
                            {FirstName} {LastName}
                          </div>
                        </div>
                      </div>
                      <div className="small-title" onClick={createQuery}>
                        Write Your Query Here...
                      </div>
                    </div>
                    <div className="tab-content-list">
                      {query.length > 0 &&
                        query.map((queryData, index) => (
                          <div className="query-info-box">
                            <div className="query-head flex-box">
                              <span className="profile-img">
                                <img
                                  src={queryData.UserDetails[0].Image}
                                  alt=""
                                />
                              </span>
                              <div className="about-query-info">
                                <div className="small-title">
                                  {queryData.UserDetails[0].FirstName}{" "}
                                  {queryData.UserDetails[0].LastName}
                                </div>
                                <div className="query-shared-by">
                                  {queryData.Category.join()}
                                </div>
                              </div>
                            </div>
                            <div className="query-desc">
                              <h2 className="small-title">{queryData.Query}</h2>
                              {queryData.Options[0].Options.map((option) => (
                                <ul className="query-options">
                                  <li>
                                    {option.Key}. {option.Answer}{" "}
                                    {option.Percentage === null ? (
                                      <span className="opt-a">
                                        <span className="graph-line"></span>{" "}
                                        {percentage} %
                                      </span>
                                    ) : (
                                      <span className="opt-a">
                                        <span className="graph-line"></span>{" "}
                                        {option.Percentage} %
                                      </span>
                                    )}
                                  </li>
                                </ul>
                              ))}
                            </div>
                            <div className="query-footer flex-box">
                              {queryData.IsVoted &&
                                queryData.EndDate >
                                moment().format("DD/MM/YYYY hh:mm:A") && (
                                  <div className="submit-btn orange-btn">
                                    <button
                                      className="desabel-btn"
                                      type="button"
                                    >
                                      VOTED
                                    </button>
                                  </div>
                                )}
                              {!queryData.IsVoted &&
                                queryData.EndDate >
                                moment().format("DD/MM/YYYY hh:mm:A") && (
                                  <div className="submit-btn">
                                    <button
                                      type="submit"
                                      onClick={() => getQueryById(queryData)}
                                    >
                                      VOTE ME!
                                    </button>
                                  </div>
                                )}
                              {queryData.EndDate <
                                moment().format("DD/MM/YYYY hh:mm:A") && (
                                  <span
                                    className="vote-count"
                                    onClick={() => viewQueryId(queryData._id)}
                                  >
                                    {queryData.TotalVotes} Votes
                                  </span>
                                )}

                              <div className="bottom-right-options">
                                <span
                                  className="like"
                                  onClick={() =>
                                    addLikeOrDisLike(queryData, index, true)
                                  }
                                >
                                  <img
                                    class="outline-icon"
                                    src="assets/images/up-arrow-outline.svg"
                                    alt=""
                                  />
                                  <img
                                    className="fill-icon"
                                    src="assets/images/up-arrow-fill.svg"
                                    alt=""
                                  />
                                  {like.find(
                                    (likeObj) => likeObj._id === queryData._id
                                  )?.TotalLikes || 0}
                                </span>

                                <span
                                  className="dislike"
                                  onClick={() =>
                                    addLikeOrDisLike(queryData, index, false)
                                  }
                                >
                                  <img
                                    class="outline-icon"
                                    src="assets/images/down-arrow-outline.svg"
                                    alt=""
                                  />
                                  <img
                                    className="fill-icon"
                                    src="assets/images/down-arrow-fill.svg"
                                    alt=""
                                  />
                                  {like.find(
                                    (disLikeObj) =>
                                      disLikeObj._id === queryData._id
                                  )?.TotalDisLikes || 0}
                                </span>
                                <span className="comments">
                                  <img
                                    src="assets/images/speech-bubble-outline.svg"
                                    alt=""
                                  />{" "}
                                  {queryData.TotalComments}
                                </span>
                                <span className="viewers">
                                  <img
                                    src="assets/images/view-outline.svg"
                                    alt=""
                                  />{" "}
                                  {queryData.TotalViews}
                                </span>
                              </div>
                            </div>
                            {queryData.EndDate >
                              moment().format("DD/MM/YYYY hh:mm:A") && (
                                <div className="poll-end-time">
                                  Poll End Date {queryData.EndDate}
                                </div>
                              )}

                            {queryData.EndDate <
                              moment().format("DD/MM/YYYY hh:mm:A") && (
                                <div class="poll-end-time poll-ended">
                                  Poll Ended
                                </div>
                              )}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
