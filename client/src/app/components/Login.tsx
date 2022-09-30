import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../actions/authActions";
import { LoginDto } from "../dtos/auth";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AuthState } from "../reducers/authReducer";

const Login = () => {
  const authState: AuthState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //@ts-ignore
  const redirectPath = location.state?.path || "/";

  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var target = e.currentTarget as HTMLFormElement;

    const loginData: LoginDto = {
      email: target._email.value,
      password: target._password.value
    }

    dispatch(
      login(loginData, () => {
        navigate(redirectPath, { replace: true });
      })
    );
  };

  return (
    <section className="vh-100 login">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: 1 }}>
            <div className="card-body p-5">
              <form onSubmit={(e) => onSubmitLogin(e)}>
                <h2 className="text-center mb-2">Login</h2>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-envelope-fill"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                    name="_email"
                  />
                </div>
                <div className="input-group mb-2">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-patch-exclamation-fill"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="_password"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-2 mb-2 "
                  >
                    LOG IN
                  </button>
                  <p className="mt-2">Register here <Link to="/signup">Signup</Link></p>
                  <p style={{ color: "red", height: "10px" }}>
                    {authState.loginErrorMsg}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
