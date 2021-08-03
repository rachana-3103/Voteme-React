import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { AuthData } from "../helper/AuthData";

const MyProfile = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    FirstName: "",
    LastName: "",
    Image: "",
    Mobile: "",
    Email: "",
    BirthDate: "",
  });
  const [edit, setEdit] = useState(false);

  const { FirstName, LastName, Image, Mobile, Email, BirthDate } = user;
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userInfo = AuthData();
    let result = await axios.get(userInfo.apiUrl, { headers: userInfo.header });
    let birthDate = new Date(result.data.Data.BirthDate);
    const date = birthDate.getFullYear().toString() + '-' + (birthDate.getMonth() + 1).toString() + '-' + birthDate.getDate().toString();
    setUser({ ...result.data.Data, BirthDate: date });
  };

  const editInfo = () => {
    setEdit(!edit);
  };

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userInfo = AuthData();
    const bodyFormData = new FormData();
    const userObj = {
      'FirstName': FirstName,
      'LastName': LastName,
      'Email': Email,
      'Mobile': Mobile,
      'BirthDate': BirthDate
    };
    for (const key in userObj) {
      if (key === 'BirthDate') {
        userObj[key] = moment(userObj.BirthDate, 'YYYY-MM-DD').format('DD/MM/YYYY')
      }
      bodyFormData.append(key, userObj[key]);
    }
    console.log(bodyFormData, '................form data');
    Object.assign(userInfo.header, {
      "Content-Type": 'multipart/form-data'
    });
    await axios.put(userInfo.apiUrl, bodyFormData, { headers: userInfo.header });
    history.push("/home");
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="right-container-inner">
          <div className="edit-profile-info flex-box">
            <div className="edit-prof-img">
              <span className="profile-img">
                <img src={Image} alt="" />
              </span>
              <div className="browse-img">
                <input type="file" name={Image} />
                <label>
                  {/* <img src="assets/images/edit_icon.svg" alt="" /> */}
                </label>
              </div>
            </div>
            <div className="edit-profile-info-inner">
              {!edit && (
                <h2 className="user-name">
                  {FirstName} {LastName}
                  <span
                    className="edit-text"
                    style={{ color: 'blue', fontSize: '15px' }}
                    onClick={() => editInfo()}
                  >
                    &nbsp; edit.
                  </span>
                </h2>
              )}

              {edit && (
                <div className="form-group">
                  <div className="form-field mobile flex-box validation-error">
                    <input
                      type="text"
                      name="FirstName"
                      value={FirstName}
                      onChange={(e) => onInputChange(e)}
                    />
                    <input
                      type="text"
                      name="LastName"
                      value={LastName}
                      onChange={(e) => onInputChange(e)}
                    />

                    <span
                      className="edit-text"
                      style={{ color: 'blue', fontSize: '15px' }}
                      onClick={() => editInfo()}
                    >
                      &nbsp; close.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="self-info-textarea">
            <textarea placeholder="Write about yourself"></textarea>
          </div>
          <div className="add-more-info">
            <h2 className="general-title">Add More Info</h2>
            <div className="form-group">
              <div className="form-field mobile flex-box validation-error">
                <label>Contact no.</label>
                <div>
                  <input type="text" name="Mobile" value={Mobile}
                    onChange={(e) => onInputChange(e)}
                  />
                  {/* <span className="validation-msg">Enter your number</span> */}
                </div>
              </div>
              <div className="form-field select-date flex-box validation-error">
                <label>
                  DOB.<sup>*</sup>
                </label>
                <div>
                  <input type="date" name="BirthDate" value={BirthDate}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
              </div>
              <div className="form-field email flex-box validation-error">
                <label>
                  Email Id.<sup>*</sup>
                </label>
                <div>
                  <input type="text" disabled name="Email" value={Email}
                  />
                  {/* <span className="validation-msg">Enter your email</span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="submit-btn">
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
