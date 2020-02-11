const INITIAL_STATE = {
  currentUser: null
};
//the first time, the stat wont have a value, so we provide a "default parameter" for
//the state property
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
