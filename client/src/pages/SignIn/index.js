/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './index.css';
import { useDispatch } from 'react-redux';
import authActions from '../../actions/auth';
import { isAuthenticate } from '../../helper/auth';
import SignInValidator from '../../validators/signin';

const SignInForm = (props) => {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});
  const [isLogin, setLogin] = useState(false);
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const error = SignInValidator(user.email, user.password);
    setErrors(error);
    if (Object.keys(error).length > 0) return;
    setLogin(true);
    const value = await dispatch(authActions.signIn(user.email, user.password));
    await setLogin(false);
    if (value) {
      // eslint-disable-next-line react/prop-types
      props.history.push('/');
    }
  };
  if (!isAuthenticate()) {
    return (
      <div className="row">
        <div id="first " className="col-5" style={{ margin: 'auto' }}>
          <div className="myform form">
            <div className="logo mb-3">
              <div className="col-md-12 text-center">
                <h1>Sign In</h1>
              </div>
            </div>
            <form method="post" name="login">
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter Email"
                  onChange={handleOnChange}
                />
                {errors && errors.email && errors.email.length > 0 && (
                  <span className="error">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Password"
                  onChange={handleOnChange}
                />
                {errors && errors.password && errors.password.length > 0 && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div className="form-group">
                <p className="text-right">
                  <Link to="/">Forgot Password</Link>
                </p>
              </div>
              <div className="col-md-12 text-center ">
                <button
                  type="submit"
                  className=" btn btn-block mybtn btn-primary tx-tfm"
                  onClick={handleSubmit}
                  disabled={isLogin}
                >
                  Submit
                </button>
              </div>
              <div className="form-check mt-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Keep me logged in
                </label>
              </div>
              <div className="col-md-12 ">
                <div className="login-or">
                  <hr className="hr-or" />
                  <span className="span-or">Or login with</span>
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="row">
                  <div className="col-md-6">
                    <p className="text-center">
                      <Link to="/" className="google btn mybtn">
                        <i className="fa fa-google-plus" /> Google
                      </Link>
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="text-center">
                      <Link to="/" className="google btn mybtn">
                        <i className="fa fa-facebook-square" /> Facebook
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <p className="text-center">
                  <Link to="/signup" id="signup">
                    Do not have a login? Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return <Redirect to="/" />;
};

export default SignInForm;
