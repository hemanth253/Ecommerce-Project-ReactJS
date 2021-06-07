import { UserActionTypes } from "./user.types.js";

const INITIAL_STATE = {
  currentUser: null,
};

// state is the current state when the action gets fired.
// redux store passes state to the reducer whenever the action gets fired
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // imported instead of just using string to not encounter typos.. by making the UserActionTypes constant
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
