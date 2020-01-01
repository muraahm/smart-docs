import axios from "axios";
import config from '../config'
import { useEffect, useReducer } from "react";
import { reducer, SET_USER_INFO, SET_USER_CATEGORIES } from "../reducer/application";
import { Categories } from "stories/3-clientCategories.stories";

export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer,
    {
      // INIT STATE
      userInfo: {},
      userCategories: []
    }
  );

  const login = (email, password) => {
    return axios.post(`${config.API_PATH}/api/login/`, { email, password })
      .then(response => {
        const userInfo = response.data;
        dispatch({ type: SET_USER_INFO, value: userInfo });
      })
      .then(
        axios.get(`${config.API_PATH}/api/user/categories/list/${email}`, { email, password })
          .then(response => {
            const userCategories = response.data;
            dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
          }))
  };

  const listUserCategories = (email) => {
    axios.get(`${config.API_PATH}/api/user/categories/list/${email}`, { email })
          .then(response => {
            const userCategories = response.data;
            dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
          })
  }


  const logout = () => {
    // const userInfo = {};
    // const userCategories = [];
    // dispatch({ type: SET_USER_INFO, SET_USER_CATEGORIES, value: userInfo, userCategories });
  }

  const createCategory = (name, email, acct_company) => {
    return axios.put(`${config.API_PATH}/api/users/create/category`, { name, email, acct_company })
      .then(response => {
        const userCategories = response.data;
        dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
      })

  }

  return {
    state,
    login,
    logout,
    createCategory,
    listUserCategories
  };
};
