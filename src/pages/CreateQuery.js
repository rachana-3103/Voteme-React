import React, { useState, useEffect } from "react";
import { AuthData } from "../helper/AuthData";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../helper/ToastMessage";

const CreateQuery = (props) => {
  const navigate = useNavigate();
  const optionName = ["Option C.", "Option D.", "Option E.", "Option F."];
  const userInfo = AuthData();

  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Image: "",
  });
  const [query, setQuery] = useState({
    Query: "",
    OptionOne: "",
    OptionTwo: "",
    OptionThree: "",
    OptionFour: "",
    OptionFive: "",
    OptionSix: "",
    ChartOption: ["1", "2", "3", "4"],
    IsPublic: "",
    CategoryId: "",
    Category: [],
    EndDate: "",
  });

  const [error, setError] = useState({
    QueryError: "",
    OptionOneError: "",
    OptionTwoError: "",
    ChartOptionError: "",
    EndDateError: "",
  });

  const [category, setCategory] = useState([]);
  const [fields, setFields] = useState([]);
  const [queryCategory, setQueryCategory] = useState([]);
  const { FirstName, LastName, Image } = user;

  const loadUserAndCategory = async () => {
    let result = await axios.get(userInfo.apiUrl, { headers: userInfo.header });
    setUser(result.data.Data);

    const categoryData = await axios.get(`http://localhost:8080/voteme/category`, { headers: userInfo.header });
    setCategory(categoryData.data.Data);

    if (props.query) {
      const getQuery = props.query;
      setQuery({
        Query: getQuery.Query,
        OptionOne: getQuery.Options[0].Answer,
        OptionTwo: getQuery.Options[1].Answer,
        OptionThree: getQuery.Options[2] && getQuery.Options[2].Answer,
        OptionFour: getQuery.Options[3] && getQuery.Options[3].Answer,
        OptionFive: getQuery.Options[4] && getQuery.Options[4].Answer,
        OptionSix: getQuery.Options[5] && getQuery.Options[5].Answer,
        ChartOption: getQuery.ChartOption,
        Category: getQuery.Category,
        EndDate: getQuery.EndDate,
        IsPublic: getQuery.IsPublic
      });
      const categoryArray = [];
      getQuery.Category.map((obj) => {
        categoryArray.push(obj._id);
      })
      setQueryCategory(categoryArray);
    }
  };

  useEffect(() => {
    loadUserAndCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCategory = (e) => {
    if (queryCategory.includes(e.target.value)) {
      queryCategory.splice(queryCategory.indexOf(e.target.value), 1);
    } else {
      queryCategory.push(e.target.value);
    }
    setQueryCategory(queryCategory);
    setQuery({ ...query, Category: queryCategory });
  };

  const onInputChange = (e) => {
    if (e.target.name == 'EndDate') {
      setQuery({ ...query, [e.target.name]: moment(e.target.value).format('YYYY-MM-DD') });
    } else {
      setQuery({ ...query, [e.target.name]: e.target.value });
    }
  };

  const optionAdd = () => {
    const values = [...fields];
    const label = optionName[fields.length];
    values.push({ value: null, label });
    setFields(values);
  };

  const optionRemove = (i) => {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
  };

  const {
    Query,
    OptionOne,
    OptionTwo,
    OptionThree,
    OptionFour,
    OptionFive,
    OptionSix,
    ChartOption,
    Category,
    IsPublic,
    EndDate,
  } = query;
  const {
    QueryError,
    OptionOneError,
    OptionTwoError,
    ChartOptionError,
    EndDateError,
  } = error;

  const formValidate = () => {
    let QueryError = "";
    let OptionOneError = "";
    let OptionTwoError = "";
    let ChartOptionError = "";
    let EndDateError = "";

    if (!Query) {
      QueryError = "Please Provide Query.";
    }
    if (!OptionOne) {
      OptionOneError = "Please Provide Option A.";
    }
    if (!OptionTwo) {
      OptionTwoError = "Please Provide Option B.";
    }
    if (!ChartOption) {
      ChartOptionError = "Please Provide Chart Option.";
    }
    if (!EndDate) {
      EndDateError = "Please Provide End Date.";
    }
    if (
      moment(EndDate).format("DD/MM/YYYY hh:mm:A") <
      moment().format("DD/MM/YYYY hh:mm:A")
    ) {
      EndDateError = "Please Provide Valid EndDate.";
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
  };

  const queryOnSubmit = async (e) => {
    e.preventDefault();
    const isValid = formValidate();
    if (isValid) {
      const userInfo = AuthData();
      const bodyFormData = new FormData();
      const queryObj = {
        UserID: user._id,
        Query: Query,
        OptionOne: OptionOne,
        OptionTwo: OptionTwo,
        OptionThree: OptionThree ? OptionThree : '',
        OptionFour: OptionFour ? OptionFour : '',
        OptionFive: OptionFive ? OptionFive : '',
        OptionSix: OptionSix ? OptionSix : '',
        ChartOption: ChartOption,
        IsPublic: IsPublic || false,
        EndDate: moment(EndDate).format('DD/MM/YYYY'),
        Category: queryCategory,
        OptionType: 1,
      };
      for (const key in queryObj) {
        if (queryObj[key] !== '') {
          bodyFormData.append(key, queryObj[key]);
        }
      }

      Object.assign(userInfo.header, {
        "Content-Type": "multipart/form-data",
      });

      let apiUrl;
      if (props.query) {
        apiUrl = `http://localhost:8080/voteme/editquery/${props.query.QueryId}`;
        const editPoll = await axios.put(apiUrl, bodyFormData, { headers: userInfo.header });
        ToastMessage(editPoll.data.message, true);
      } else {
        apiUrl = "http://localhost:8080/voteme/createpoll";
        const data = await axios.post(apiUrl, bodyFormData, { headers: userInfo.header });
        ToastMessage(data.data.message, true);
      }
      navigate("/home");
    }
  };

  return (
    <div>
      <div className="blue-strip">
        <h1 className="page-title">Query Of The Day</h1>
      </div>
      <form onSubmit={(e) => queryOnSubmit(e)}>
        <div className="right-container-inner">
          <div className="profile-info">
            <span className="profile-img">
              <img src={Image} alt="" />
            </span>
            <span className="general-title">
              {FirstName} {LastName}
            </span>
            <span className="credential-info">Engineer.</span>
          </div>
          <div className="select-query-type-block">
            <div className="upload-img-box">
              <div className="text-area-field">
                <textarea
                  className="full-height"
                  name="Query"
                  value={Query}
                  placeholder="Write your query here..."
                  onChange={(e) => onInputChange(e)}
                ></textarea>
              </div>
            </div>
            {QueryError ? (
              <span style={{ color: "red" }}> {QueryError}</span>
            ) : null}
          </div>
        </div>
        <div className="select-query-type-block">
          <div className="select-option-title">Add Options</div>
          <div className="option-textarea">
            <div className="option-textarea-inner">
              <div className="text-area-field">
                <textarea
                  className="full-height"
                  placeholder="Option A."
                  maxLength="100"
                  name="OptionOne"
                  value={OptionOne}
                  onChange={(e) => onInputChange(e)}
                ></textarea>
              </div>
            </div>
            <div className="option-textarea-inner">
              <div className="text-area-field">
                <textarea
                  className="full-height"
                  placeholder="Option B."
                  maxLength="100"
                  name="OptionTwo"
                  value={OptionTwo}
                  onChange={(e) => onInputChange(e)}
                ></textarea>
              </div>
            </div>
            {OptionOneError ? (
              <span style={{ marginLeft: "10px", color: "red" }}>
                {" "}
                {OptionOneError}
              </span>
            ) : null}
            {OptionTwoError ? (
              <span style={{ marginLeft: "55%", color: "red" }}>
                {" "}
                {OptionTwoError}
              </span>
            ) : null}
            {fields.length <= 4 &&
              fields.map((field, id) => (
                <div className="option-textarea-inner" key={`${field}-${id}`}>
                  <div className="text-area-field">
                    {field.label === 'Option C.' && <textarea
                      className="full-height"
                      placeholder={field.label}
                      name="OptionThree"
                      value={OptionThree}
                      onChange={(e) => onInputChange(e)}
                      maxLength="100"
                    ></textarea>}
                    {field.label === 'Option D.' && <textarea
                      className="full-height"
                      placeholder={field.label}
                      name="OptionFour"
                      value={OptionFour}
                      onChange={(e) => onInputChange(e)}
                      maxLength="100"
                    ></textarea>}
                    {field.label === 'Option E.' && <textarea
                      className="full-height"
                      placeholder={field.label}
                      name="OptionFive"
                      value={OptionFive}
                      onChange={(e) => onInputChange(e)}
                      maxLength="100"
                    ></textarea>}
                    {field.label === 'Option F.' && <textarea
                      className="full-height"
                      placeholder={field.label}
                      name="OptionSix"
                      value={OptionSix}
                      onChange={(e) => onInputChange(e)}
                      maxLength="100"
                    ></textarea>}
                    <div className="detete-opt">
                      <span className="delete" onClick={() => optionRemove(id)}>
                        X
                      </span>
                    </div>
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
              <input
                id="text"
                name="ChartOption"
                value={ChartOption[0]}
                type="radio"
                checked={ChartOption === '1' ? 'checked' : null}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="text">
                <img src="assets/images/bar-chart.jpg" alt="" />
                <span>Bar Chart</span>
              </label>
            </div>
            <div className="select-box-inner">
              <input
                id="image"
                name="ChartOption"
                value={ChartOption[1]}
                type="radio"
                checked={ChartOption === '2' ? 'checked' : null}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="image">
                <img src="assets/images/pie-chart.png" alt="" />
                <span>Pie Chart</span>
              </label>
            </div>
            <div className="select-box-inner">
              <input
                id="audio"
                name="ChartOption"
                value={ChartOption[2]}
                type="radio"
                checked={ChartOption === '3' ? 'checked' : null}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="audio">
                <img src="assets/images/lin-chart.jpg" alt="" />
                <span>Line Chart</span>
              </label>
            </div>
            <div className="select-box-inner">
              <input
                id="video"
                name="ChartOption"
                value={ChartOption[3]}
                type="radio"
                checked={ChartOption === '4' ? 'checked' : null}
                onChange={(e) => onInputChange(e)}
              />
              <label htmlFor="video">
                <img src="assets/images/donut-chart.png" alt="" />
                <span>Donut Chart</span>
              </label>
            </div>
          </div>
          {ChartOptionError ? (
            <span style={{ marginLeft: "25px", color: "red" }}>
              {" "}
              {ChartOptionError} <br></br>
            </span>
          ) : null}
        </div>
        <div className="ask-query">
          <div className="ask-query-inner flex-box">
            <h2 className="section-title">Share your query with</h2>
            <div className="query-type-radio">
              <span className="public">
                <input
                  id="public"
                  type="radio"
                  name="IsPublic"
                  value={true}
                  checked={IsPublic === true ? 'checked' : null}
                  onChange={(e) => onInputChange(e)}
                />
                <label htmlFor="public">
                  <i className="fa fa-users" aria-hidden="true"></i> Public
                </label>
              </span>
              <span className="private">
                <input
                  id="private"
                  type="radio"
                  name="IsPublic"
                  value={false}
                  checked={IsPublic === false ? 'checked' : null}
                  onChange={(e) => onInputChange(e)}
                />
                <label htmlFor="private">
                  <i className="fa fa-user" aria-hidden="true"></i> Private
                </label>
              </span>
            </div>
          </div>
        </div>
        <div className="query-end-time">
          <div className="query-end-inner flex-box">
            <h2 className="section-title">Query end time</h2>
            <div className="select-date">
              <input
                type="date"
                name="EndDate"
                value={EndDate}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
        </div>
        {EndDateError ? (
          <span style={{ marginLeft: "25px", color: "red" }}>
            {" "}
            {EndDateError} <br></br>
            <br></br>
          </span>
        ) : null}
        <div className="select-category">
          <h2 className="section-title">What are your interests?</h2>
          <div
            className="category-cover"
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto auto auto",
              width: "70%",
              marginLeft: "30px",
              marginBottom: "50px",
            }}
          >
            {category.map((e) => (
              <div
                className="category-list"
                style={{ backgroundImage: `url(${e.Image})`, width: "107px" }}>
                <input
                  type="checkbox"
                  name="CategoryId"
                  value={e._id}
                  defaultChecked={queryCategory.find((el) => el == e._id)}
                  onClick={(e) => selectCategory(e)}
                />
                <label>
                  <span>{e.CategoryName}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="submit-btn" style={{ marginLeft: "40%" }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuery;
