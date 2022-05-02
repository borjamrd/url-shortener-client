import {
  URLS_UPDATE_REQUEST,
  URLS_UPDATE_SUCCESS,
  URLS_UPDATE_FAIL,
  URLS_CREATE_FAIL,
  URLS_CREATE_REQUEST,
  URLS_CREATE_SUCCESS,
  URLS_DELETE_FAIL,
  URLS_DELETE_REQUEST,
  URLS_DELETE_SUCCESS,
  URLS_LIST_FAIL,
  URLS_LIST_REQUEST,
  URLS_LIST_SUCCESS,
} from "../constants/urlsConstants";

export const urlListReducer = (state = { URLS: [] }, action) => {
  switch (action.type) {
    case URLS_LIST_REQUEST:
      return { loading: true };
    case URLS_LIST_SUCCESS:
      return { loading: false, URLS: action.payload };
    case URLS_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const urlCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case URLS_CREATE_REQUEST:
      return { loading: true };
    case URLS_CREATE_SUCCESS:
      return { loading: false, success: true };
    case URLS_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const urlDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case URLS_DELETE_REQUEST:
      return { loading: true };
    case URLS_DELETE_SUCCESS:
      return { loading: false, success: true };
    case URLS_DELETE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export const urlUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case URLS_UPDATE_REQUEST:
      return { loading: true };
    case URLS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case URLS_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};
