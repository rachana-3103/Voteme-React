import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthData } from "../helper/AuthData";
import CreateQuery from "./CreateQuery";
import ToastMessage from '../helper/ToastMessage';

const MyQuery = () => {
  const [query, setQuery] = useState([]);
  const [editFlag, setEditFlag] = useState(false);
  const [queryId, setQueryId] = useState();
  const userInfo = AuthData();
  let percentage = 0;

  useEffect(() => {
    loadMyQuery();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMyQuery = async () => {
    let queryData = await axios.get(`http://localhost:8080/voteme/myquery`, {
      headers: userInfo.header,
    });
    setQuery(queryData.data.Data[0].Records);
  };

  const editQuery = (editFlag, queryId) => {
    setEditFlag(editFlag);
    setQueryId(queryId);
  }

  const deleteQuery = async (queryId) => {
    const queryData = await axios.delete(`http://localhost:8080/voteme/deletequery/${queryId}`, { headers: userInfo.header });
    ToastMessage(queryData.data.message, true);
    loadMyQuery();
  }

  return (
    <div className="my-queries">
      {editFlag && <CreateQuery edit={editFlag} queryId={queryId} />}
      {!editFlag && <div className="query-tabing">
        <div className="tab-listing">
          <ul className="tabbing-nav">
            <li className="active-tab">
              <a href="#recent-queries">Recent Queries</a>
            </li>
            <li>
              <a href="#top-queries">Top 10 Queries</a>
            </li>
            <li>
              <a href="#popular-queries">Popular Queries</a>
            </li>
            <li>
              <a href="#all-queries">All Queries</a>
            </li>
          </ul>
        </div>
        <div className="tabs-content-cover">
          <div id="recent-queries" className="tab-content">
            {query.length > 0 ? (
              query.map((queryData) => (
                <div className="tab-content-list">
                  <div className="query-info-box">
                    <div className="query-head flex-box">
                      <span className="profile-img">
                        <img src={queryData.UserDetails[0].Image} alt="" />
                      </span>
                      <div className="about-query-info">
                        <div className="small-title" style={{ fontSize: '15px' }}>
                          {queryData.UserDetails[0].FirstName} {queryData.UserDetails[0].LastName}
                        </div>
                        <div className="query-shared-by">{queryData.Category.join()}</div>
                      </div>
                    </div>
                    <div className="query-desc">
                      <h2 className="small-title">{queryData.Query}</h2>
                      {queryData.Options[0].Options.map((option) => (
                        <ul className="query-options">
                          <li>
                            {option.Key}. {option.Answer}
                            {option.Percentage === null ?
                              (<span className="opt-a">
                                <span className="graph-line"></span> {percentage} %
                              </span>) :
                              (<span className="opt-a">
                                <span className="graph-line"></span> {option.Percentage} %
                              </span>)}
                          </li>
                        </ul>
                      ))}
                    </div>
                    <div className="query-footer flex-box">
                      <div className="vote-count">{queryData.TotalVotes} Votes</div>
                      <div className="bottom-right-options">
                        <span className="like">
                          <img
                            className="outline-icon"
                            src="assets/images/up-arrow-outline.svg"
                            alt=""
                          />
                          <img
                            className="fill-icon"
                            src="assets/images/up-arrow-fill.svg"
                            alt=""
                          />{" "}
                          {queryData.TotalLikes}
                        </span>
                        <span className="dislike">
                          <img
                            className="outline-icon"
                            src="assets/images/down-arrow-outline.svg"
                            alt=""
                          />
                          <img
                            className="fill-icon"
                            src="assets/images/down-arrow-fill.svg"
                            alt=""
                          />{" "}
                          {queryData.TotalDisLikes}
                        </span>
                        <span className="comments">
                          <img
                            src="assets/images/speech-bubble-outline.svg"
                            alt=""
                          />{" "}
                          {queryData.TotalComments}
                        </span>
                        <span className="viewers">
                          <img src="assets/images/view-outline.svg" alt="" /> {queryData.TotalViews}
                        </span>
                      </div>
                      <div className="poll-end-time">
                        Pole End Time {queryData.EndDate}
                      </div>
                      <div className="query-cta-btns">
                        <span className="edit" onClick={() => editQuery(true, queryData._id)}>
                          <img src="assets/images/edit.svg" alt="" />
                        </span>
                        <span className="delete" onClick={() => deleteQuery(queryData._id)}>
                          <img src="assets/images/delete.svg" alt="" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                )))
              : (
                <div id="all-queries">
                  <div className="tab-content-list">
                    <div className="empty-query-info">Have any query? <a href="/">Share with us</a></div>
                  </div>
                </div>)}
          </div>
        </div>
      </div>}
    </div >
  );
};

export default MyQuery;
