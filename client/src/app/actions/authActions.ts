import { LoggedInDto, LoginDto, SignupDto } from "../dtos/auth";
import { AppDispatch } from "../store";
import { AuthAction } from "./actionTypes";
import _ from "underscore";
import apiService from "../service/apiService";
import { showLoader } from "./commonAction";
import { AxiosError, AxiosResponse } from "axios";

export const authTokenKey = "accessToken";

export const setAuthToken = (authValue: string) => {
  return localStorage.setItem(authTokenKey, authValue);
};

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem(authTokenKey);

  try {
    const tokenWithExpiry: LoggedInDto = JSON.parse(token!)
    if (tokenWithExpiry.expires_in < Date.now()) {
      return null;
    }
    return tokenWithExpiry.access_token;
  } catch (error) {
    return null;
  }
};

export const login = (
  input: LoginDto,
  callback: VoidFunction
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: AuthAction.LOGIN.PROCESSING });
    dispatch(showLoader(true));
    apiService
      .post(`/auth/signin`, input)
      .then((res: AxiosResponse) => {
        const loggedIn: LoggedInDto = res.data;
        dispatch({ type: AuthAction.LOGIN.SUCCESS });
        dispatch(showLoader(false));
        setAuthToken(JSON.stringify(loggedIn));
        callback();
      })
      .catch((e: AxiosError) => {
        dispatch({ type: AuthAction.LOGIN.FAILED, payload: e.message });
        dispatch(showLoader(false));
        setAuthToken("");
      });
  };
};

export const signup = (
  input: SignupDto,
  callback: VoidFunction
) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: AuthAction.SIGNUP.PROCESSING });
    dispatch(showLoader(true));
    apiService
      .post(`/auth/signup`, input)
      .then((res) => {
        dispatch({ type: AuthAction.SIGNUP.SUCCESS });
        dispatch(showLoader(false));
        callback();
      })
      .catch((e: AxiosError) => {
        dispatch({ type: AuthAction.SIGNUP.FAILED, payload: e.message });
        dispatch(showLoader(false));
      });
  };
};

export const logout = (callback: VoidFunction) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: AuthAction.LOGOUT });
    setAuthToken("");
    callback();
  };
};

export const isUserAuthenticated = () => {
  return (dispatch: AppDispatch) => {
    const isAuthPresent = !_.isEmpty(getAuthToken());
    dispatch({ type: AuthAction.AUTHENTICATION, payload: isAuthPresent });
  };
};
