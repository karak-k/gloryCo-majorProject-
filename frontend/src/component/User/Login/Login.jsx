import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import "../../User/forms.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../actions/userActions";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "../../layout/Loading/Loading";
import MetaData from "../../layout/Helmets/MetaData";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, loading } = useSelector((state) => state.user);
  const redirect = location.search ? location.search.split("=")[1] : "account";
  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [redirect, isAuthenticated, navigate]);

  const changeHandler = (event) => {
    let { name, value } = event.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const login = (event) => {
    event.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title="Login"/>
          <div className="Login-container">
            <h1 className="form-heading">Login to your account</h1>
            <form className="Login-form" onSubmit={login}>
              <input
                className="email-input"
                type="email"
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
              <div>
                <button className="Login-btn" type="submit">
                  Login In
                </button>
              </div>
              <Link to="/register" className="changeTab">
                Create an account?
              </Link>
            </form>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Login;
