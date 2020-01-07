import axios from "axios";
import config from '../config'
import { useEffect, useReducer } from "react";
import {
  reducer,
  SET_USER_INFO,
  SET_USER_CATEGORIES,
  SET_ACCOUNTANTS,
  SET_APP_DATA,
  SET_USER_RECIEPTS
} from "../reducer/application";

export function useApplicationData() {
  const [state, dispatch] = useReducer(reducer,
    {
      // INIT STATE
      userInfo: {},
      userCategories: [],
      accountants: [],
      userReciepts: []
    }
  );

  //handle accountant register api call
  const registerAccountant = (name, accountantCompany, email, password) => {
    return axios.put(`${config.API_PATH}/api/accountant/register`, { name, accountantCompany, email, password })
      .then(response => {
        if (response.data.meassage)
          alert(response.data.meassage);
        const userInfo = response.data;
        dispatch({ type: SET_USER_INFO, value: userInfo });
      })
  }

  //accountant login api call
  const loginAccountant = (email, password) => {
    return axios.post(`${config.API_PATH}/api/accountant/login`, { email, password })
      .then(response => {
        if (response.data.meassage)
          alert(response.data.meassage);
        const userInfo = response.data;
        dispatch({ type: SET_USER_INFO, value: userInfo });
      })

  }

  //client login api call
  const login = (email, password) => {
    return axios.post(`${config.API_PATH}/api/login/`, { email, password })
      .then(response => {
        if (response.data.meassage)
          alert(response.data.meassage);
        const userInfo = response.data;
        //dispatch client info to the reducer
        dispatch({ type: SET_USER_INFO, value: userInfo });
      })
      .then(
        //grab all available categories
        axios.get(`${config.API_PATH}/api/user/categories/list/${email}`, { email })
          .then(response => {
            const userCategories = response.data;
            dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
          }))
      .then(
        //grab all available accountants
        axios.get(`${config.API_PATH}/api/accountants`)
          .then(response => {
            const accountants = response.data;
            dispatch({ type: SET_ACCOUNTANTS, value: accountants });
          })
      )
  };

  //get all available files for the client from the database
  const getReceipts = (categoryId, userId) => {
    return axios.post(`${config.API_PATH}/api/user/reciepts`, { categoryId, userId })
      .then(response => {
        const userReciepts = response.data
        dispatch({ type: SET_USER_RECIEPTS, value: userReciepts });
      })
  }

  //get all user categories from the database 
  const listUserCategories = (email) => {
    axios.get(`${config.API_PATH}/api/user/categories/list/${email}`, { email })
      .then(response => {
        const userCategories = response.data;
        dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
      })
  }

  //set to empty state and remove token while loggin out
  const logout = () => {
    const userInfo = {};
    const userCategories = [];
    localStorage.removeItem("together::accountant")
    localStorage.removeItem("together::token")
    dispatch({ type: SET_USER_INFO, SET_USER_CATEGORIES, value: userInfo, userCategories });
  }

  const createCategory = (name, email, acct_company) => {
    return axios.put(`${config.API_PATH}/api/users/create/category`, { name, email, acct_company })
      .then(response => {
        axios.get(`${config.API_PATH}/api/user/categories/list/${email}`, { email })
          .then(response => {
            const userCategories = response.data;
            dispatch({ type: SET_USER_CATEGORIES, value: userCategories });
          })
      })

  }

  //handle client register api call
  const register = (name, email, password) => {
    return axios.put(`${config.API_PATH}/api/users/register`, { name, email, password })
      .then(response => {
        if (response.data.meassage)
          alert(response.data.meassage);
        const userInfo = response.data;
        dispatch({ type: SET_USER_INFO, value: userInfo });
      })
      .then(
        axios.get(`${config.API_PATH}/api/accountants`)
          .then(response => {
            const accountants = response.data;
            dispatch({ type: SET_ACCOUNTANTS, value: accountants });
          })
      )
  }

  useEffect(
    () => {
      //get token from local storage and check if user client or accountant
      const token = localStorage.getItem("together::token");
      const isAccountant = localStorage.getItem("together::accountant");
      //use effect api call if client logged in
      if (isAccountant === 'no') {
        Promise.all([
          axios.get(`${config.API_PATH}/api/accountants`),
          axios.post(`${config.API_PATH}/api/user`, { token })
        ])
          .then((all) => {
            dispatch({
              type: SET_APP_DATA,
              value: {
                accountants: all[0].data,
                userInfo: all[1].data.userInfo,
                userCategories: all[1].data.categories
              }

            });
          })
          .catch(err => {
            // console.log(err.response.status);
            // console.log(err.response.headers);
            // console.log(err.response.data);
          });
      }
      //use effect api call if accountant logged in
      if (isAccountant === 'yes') {
        axios.post(`${config.API_PATH}/api/accountant`, { token })
          .then(response => {
            const userInfo = response.data;
            dispatch({ type: SET_USER_INFO, value: userInfo });

          })
          .catch(err => {
            // console.log(err.response.status);
            // console.log(err.response.headers);
            // console.log(err.response.data);
          });
      }
    }, []);



  return {
    state,
    login,
    register,
    logout,
    createCategory,
    listUserCategories,
    getReceipts,
    dispatch,
    registerAccountant,
    loginAccountant
  };
};
