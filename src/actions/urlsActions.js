import {
  URLS_CREATE_FAIL,
  URLS_CREATE_REQUEST,
  URLS_CREATE_SUCCESS,
  URLS_DELETE_FAIL,
  URLS_DELETE_REQUEST,
  URLS_DELETE_SUCCESS,
  URLS_LIST_FAIL,
  URLS_LIST_REQUEST,
  URLS_LIST_SUCCESS,
  URLS_UPDATE_FAIL,
  URLS_UPDATE_REQUEST,
  URLS_UPDATE_SUCCESS,
} from "../constants/urlsConstants";
import axios from "axios";

export const listUrls = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: URLS_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`http://localhost:5000/api/urls/`, config);

    dispatch({
      type: URLS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: URLS_LIST_FAIL,
      payload: message,
    });
  }
};

export const createUrlAction = (title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: URLS_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:5000/api/urls/create`,
      { title, content, category },
      config
    );

    dispatch({
      type: URLS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: URLS_CREATE_FAIL,
      payload: message,
    });
  }
};

export const deleteUrlAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: URLS_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`http://localhost:5000/api/urls/${id}`, config);

    dispatch({
      type: URLS_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: URLS_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateUrlAction = (id, title, content, category) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: URLS_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5000/api/urls/${id}`,
      { title, content, category },
      config
    );

    dispatch({
      type: URLS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: URLS_UPDATE_FAIL,
      payload: message,
    });
  }
};
