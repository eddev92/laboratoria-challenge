import { LOGIN_ACTION } from "../../constants/actions";

let defaultState = {
  user: {
    userName: '',
    password: ''
  },
  isValid: false,
}

const auth = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_ACTION.LOGIN_ACTION_LOGIN_USER:
      return {
        ...state,
        user: state.user,
        isValid: true
      }
    case LOGIN_ACTION.LOGIN_ACTION_HANDLE_USER_INFO: {
			const value = action.value;
      const id = action.id;
      let userAux = { ...state.user };

      userAux[id] = value;
       return {
         ...state,
        user: userAux
               }
      } 

    default:
      return state
  }
}

export default auth
