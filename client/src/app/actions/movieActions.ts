
import { AxiosError, AxiosResponse } from "axios";
import { MovieDto } from "../dtos/movie";
import apiService from "../service/apiService";
import { AppDispatch } from "../store";
import { MovieAction } from "./actionTypes";
import { onHandleAlert, showLoader } from './commonAction'

export const getAllMovies = () => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.GET_ALL_MOVIES.PROCESSING });
    dispatch(showLoader(true));
    apiService
      .get(`/movie/get-all-movies`)
      .then((res: AxiosResponse) => {
        const data: MovieDto[] = res.data;
        dispatch({
          type: MovieAction.GET_ALL_MOVIES.SUCCESS,
          payload: data
        });
        dispatch(showLoader(false));
      })
      .catch((e: AxiosError) => {
        dispatch({
          type: MovieAction.GET_ALL_MOVIES.FAILED,
          payload: e.message,
        });
        dispatch(showLoader(false));
      });
  };
};

export const addMovie = (movie: MovieDto, cb?: VoidFunction) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.ADD_NEW_MOVIE.PROCESSING });
    dispatch(showLoader(true));
    apiService
      .post(`/movie/add-movie`, movie)
      .then((res: AxiosResponse) => {
        const data = res.data;
        dispatch({
          type: MovieAction.ADD_NEW_MOVIE.SUCCESS,
          payload: data
        });
        dispatch(showLoader(false));
        dispatch(onHandleAlert("Movie Added successfully", true));
        if (cb) {
          cb();
        }
      })
      .catch((e: AxiosError) => {
        dispatch({
          type: MovieAction.ADD_NEW_MOVIE.FAILED,
          payload: e.message,
        });
        dispatch(showLoader(false));
        dispatch(onHandleAlert("Movie Added failed", false));
      });
  };
};

export const deleteMovie = (id: number) => {
  return (dispatch: AppDispatch) => {
    dispatch({ type: MovieAction.DELETE_MOVIE.PROCESSING });
    dispatch(showLoader(true));
    apiService
      .delete(`/movie/` + id)
      .then(() => {
        dispatch({
          type: MovieAction.DELETE_MOVIE.SUCCESS,
          payload: id
        });
        dispatch(onHandleAlert("Movie deleted successfully", true));
        dispatch(showLoader(false));
      })
      .catch((e: AxiosError) => {
        dispatch({
          type: MovieAction.DELETE_MOVIE.FAILED,
          payload: e.message,
        });
        dispatch(onHandleAlert("Movie deleted failed", false));
        dispatch(showLoader(false));
      });
  };
};
