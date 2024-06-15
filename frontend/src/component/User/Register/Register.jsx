import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../../User/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../actions/userActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { profileImages } from "../profileIcons";
import defaultProfile from "../../../images/Profile.png";
import MetaData from "../../layout/Helmets/MetaData";

const Register = ()=> {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [isAuthenticated, navigate]);

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const createUser = async (event) => {
    event.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <Fragment>
      <MetaData title="Sign up"/>
      <div className="Register-container">
      {console.log(user)}
      <h1 className="form-heading">Create your account</h1>
      <form className="Register-form" onSubmit={createUser}>
        <input
          className="name-input"
          type="text"
          placeholder="Name"
          name="name"
          value={user.name}
          onChange={changeHandler}
        />
        <input
          className="email-input"
          type="text"
          placeholder="Email"
          name="email"
          value={user.email}
          onChange={changeHandler}
        />
        <input
          className="password-input"
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={changeHandler}
        />

        <div className="profile-section">
          <div className="profile-preview">
            <img src={user.avatar?user.avatar:defaultProfile}alt="" />
          </div>
          <div className="profile-select">
            <h2>Select Profile:</h2>
            <select name="avatar" onChange={changeHandler}>
              {profileImages.map((url, index) => (
                <option key={index} value={url}>
                  Profile {index + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button className="Register-btn" type="submit">
            Create Account
          </button>
        </div>

        <Link
          className="changeTab"
          to="/login"
        >
          Already have an account?
        </Link>
      </form>
    </div>
    </Fragment>
  );
}

export default Register;
