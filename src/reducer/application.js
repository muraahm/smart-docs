const SET_USER_INFO = "SET_USER_INFO"
const SET_USER_CATEGORIES = "SET_USER_CATEGORIES"

function reducer(state, action) {
  
  switch (action.type) {
    
      case SET_USER_INFO:
      return { ...state, userInfo: action.value}
      
      case SET_USER_CATEGORIES:
        return { ...state, userCategories: action.value}

      
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export {
  reducer,
  SET_USER_INFO,
  SET_USER_CATEGORIES
};