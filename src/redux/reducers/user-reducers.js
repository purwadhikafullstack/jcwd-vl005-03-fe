import { GET_USER_DATA } from "../actions/types";

const INITIAL_STATE = {
  username: "",
  fullname: "",
  email: "",
};

export default function adminReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_DATA:
      return {
        ...state,
        username: action.payload.username,
        fullname: action.payload.fullname,
        email: action.payload.email,
      };
    case DELETE_USER_DATA:
      return INITIAL_STATE;
    default:
      return state;
  }
}
