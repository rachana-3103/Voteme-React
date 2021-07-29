import React, { useState, useEffect } from 'react';
import { AuthData } from "../helper/AuthData";
import axios from 'axios';
import moment from 'moment';
import { useHistory } from "react-router-dom";

const CreateQuery = () => {

  const history = useHistory();
  const optionName = ['Option C.', 'Option D.', 'Option E.', 'Option F.'];

  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Image: ""
  });

  const [query, setQuery] = useState({
    Query: "",
    OptionOne: "",
    OptionTwo: "",
    ChartOption: "",
    IsPublic: "",
    CategoryId: "",
    Category: [],
    EndDate: "",
  });


  const [error, setError] = useState({
    QueryError: '',
    OptionOneError: '',
    OptionTwoError: '',
    ChartOptionError: '',
    EndDateError: '',
    // CategoryError: ''
  });

  const [category, setCategory] = useState([]);
  const [fields, setFields] = useState([]);
  const { FirstName, LastName, Image } = user;

  const loadUserAndCategory = async () => {
    const userInfo = AuthData();
    let result = await axios.get(userInfo.apiUrl, { headers: userInfo.header });
    setUser(result.data.Data);
    const categoryData = await axios.get(`http://localhost:3000/voteme/category`, { headers: userInfo.header });
    setCategory(categoryData.data.Data);
  };

  useEffect(() => {
    loadUserAndCategory();
  }, []);

  const selectCategory = (e) => {
    const category = [...query.Category];
    category.push(e.target.value);
    setQuery({ ...query, Category: category });
  }

  const onInputChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  }

  const optionAdd = () => {
    const values = [...fields];
    const label = optionName[fields.length];
    values.push({ value: null, label });
    setFields(values);
  }

  const optionRemove = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  }


  const { Query, OptionOne, OptionTwo, ChartOption, Category, IsPublic, EndDate } = query;
  const { QueryError, OptionOneError, OptionTwoError, ChartOptionError, EndDateError } = error;

  const formValidate = () => {
    let QueryError = '';
    let OptionOneError = '';
    let OptionTwoError = '';
    let ChartOptionError = '';
    let EndDateError = '';

    if (!Query) {
      QueryError = 'Please Provide Query.';
    }
    if (!OptionOne) {
      OptionOneError = 'Please Provide Option A.';
    }
    if (!OptionTwo) {
      OptionTwoError = 'Please Provide Option B.';
    }
    if (!ChartOption) {
      ChartOptionError = 'Please Provide Chart Option.';
    }
    if (!EndDate) {
      EndDateError = 'Please Provide End Date.';
    }
    if (QueryError) {
      setError({ QueryError });
      return false;
    }
    if (OptionOneError) {
      setError({ OptionOneError });
      return false;
    }
    if (OptionTwoError) {
      setError({ OptionTwoError });
      return false;
    }
    if (ChartOptionError) {
      setError({ ChartOptionError });
      return false;
    }
    if (EndDateError) {
      setError({ EndDateError });
      return false;
    }

    return true;
  }



  const queryOnSubmit = async (e) => {
    e.preventDefault();
    const isValid = formValidate();
    if (isValid) {
      const userInfo = AuthData();
      const bodyFormData = new FormData();

      const queryObj = {
        'UserID': user._id,
        'Query': Query,
        'OptionOne': OptionOne,
        'OptionTwo': OptionTwo,
        'ChartOption': ChartOption,
        'IsPublic': IsPublic || false,
        'EndDate': EndDate,
        'Category': Category,
        'OptionType': 1
      };
      console.log(queryObj, '...................obj');

      for (const key in queryObj) {
        if (key === 'EndDate') {
          queryObj[key] = moment(queryObj.EndDate, 'YYYY-MM-DD').format('DD/MM/YYYY hh:mm A')
        }
        bodyFormData.append(key, queryObj[key]);
      }

      Object.assign(userInfo.header, {
        "Content-Type": 'multipart/form-data'
      });

      const apiUrl = 'http://localhost:3000/voteme/createpoll'
      await axios.post(apiUrl, bodyFormData, { headers: userInfo.header });
      history.push("/home");
    }
  }

  return (
    <div>
      <div className="blue-strip"><h1 className="page-title">Query Of The Day</h1></div>
      <form onSubmit={(e) => queryOnSubmit(e)}>
        <div className="right-container-inner">
          <div className="profile-info"><span className="profile-img"><img src={Image} alt="" /></span>
            <span className="general-title">{FirstName} {LastName}</span><span className="credential-info">Engineer .</span>
          </div>
          <div className="select-query-type-block">
            <div className="upload-img-box">
              <div className="text-area-field">
                <textarea className="full-height" name="Query" value={Query} placeholder="Write your query here..." onChange={(e) => onInputChange(e)}></textarea>
              </div>
            </div>
            {QueryError ? (
              <span style={{ color: 'red' }}> {QueryError}</span>
            ) : null}
          </div>
        </div>
        <div className="select-query-type-block">
          <div className="select-option-title">Add Options</div>
          <div className="option-textarea">
            <div className="option-textarea-inner">
              <div className="text-area-field">
                <textarea className="full-height" placeholder="Option A." maxLength="100" name='OptionOne' value={OptionOne} onChange={(e) => onInputChange(e)}
                ></textarea>
              </div>
            </div>
            <div className="option-textarea-inner">
              <div className="text-area-field">
                <textarea className="full-height" placeholder="Option B." maxLength="100" name='OptionTwo' value={OptionTwo} onChange={(e) => onInputChange(e)}></textarea>
              </div>
            </div>
            {OptionOneError ? (
              <span style={{ marginLeft: '10px', color: 'red' }}> {OptionOneError}</span>
            ) : null}
            {OptionTwoError ? (
              <span style={{ marginLeft: '55%', color: 'red' }}> {OptionTwoError}</span>
            ) : null}
            {fields.length <= 4 && fields.map((field, id) => (
              <div className="option-textarea-inner" key={`${field}-${id}`}>
                <div className="text-area-field">
                  <textarea className="full-height" placeholder={field.label} maxLength="100"></textarea>
                  <div className="detete-opt"><span className="delete" onClick={() => optionRemove(id)}>X</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="add-options">
            <button type="button" onClick={() => optionAdd()}>
              <span>+</span>
              <span>Add More</span>
            </button>
          </div>
        </div>
        <div className="chart-type">
          <div className="section-title">Representation of your results</div>
          <div className="custom-select-box">
            <div className="select-box-inner">
              <input id="text" name="ChartOption" value={1} type="radio" onChange={(e) => onInputChange(e)} />
              <label htmlFor="text"><img src="assets/images/bar-chart.jpg" alt="" /><span >Bar Chart</span></label>
            </div>
            <div className="select-box-inner">
              <input id="image" name="ChartOption" value={2} type="radio" onChange={(e) => onInputChange(e)} />
              <label htmlFor="image"><img src="assets/images/pie-chart.png" alt="" /><span>Pie Chart</span></label>
            </div>
            <div className="select-box-inner">
              <input id="audio" name="ChartOption" value={3} type="radio" onChange={(e) => onInputChange(e)} />
              <label htmlFor="audio"><img src="assets/images/lin-chart.jpg" alt="" /><span>Line Chart</span></label>
            </div>
            <div className="select-box-inner">
              <input id="video" name="ChartOption" value={4} type="radio" onChange={(e) => onInputChange(e)} />
              <label htmlFor="video"><img src="assets/images/donut-chart.png" alt="" /><span>Donut Chart</span></label>
            </div>
          </div>
          {ChartOptionError ? (
            <span style={{ marginLeft: '25px', color: 'red' }}> {ChartOptionError} <br></br></span>
          ) : null}
        </div>
        <div className="ask-query">
          <div className="ask-query-inner flex-box">
            <h2 className="section-title">Share your query with</h2>
            <div className="query-type-radio">
              <span className="public"><input id="public" type="radio" name="IsPublic" value={true} onChange={(e) => onInputChange(e)} />
                <label htmlFor="public"><i className="fa fa-users" aria-hidden="true"></i> Public</label></span>
              <span className="private"><input id="private" type="radio" name="IsPublic" value={false} onChange={(e) => onInputChange(e)} />
                <label htmlFor="private"><i className="fa fa-user" aria-hidden="true"></i> Private</label></span>
            </div>
          </div>
        </div>
        <div className="query-end-time">
          <div className="query-end-inner flex-box">
            <h2 className="section-title">Query end time</h2>
            <div className="select-date"><input type="date" name="EndDate" value={EndDate} onChange={(e) => onInputChange(e)} /></div>
          </div>
        </div>
        {EndDateError ? (
          <span style={{ marginLeft: '25px', color: 'red' }}> {EndDateError} <br></br></span>
        ) : null}
        <div className="select-category">
          <h2 className="section-title">What are your interests?</h2>
          <div className="category-cover">
            {category.map((e) => (
              <div className="category-list" style={{ backgroundImage: 'url("assets/images/Astrogoy_200x200.jpg")' }}>
                <input type="checkbox" name="CategoryId" value={e._id} onChange={(e) => selectCategory(e)} />
                <label><span>{e.CategoryName}</span></label>
              </div>
            ))}
          </div>
        </div>
        <div className="submit-btn">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div >
  )
}

export default CreateQuery;