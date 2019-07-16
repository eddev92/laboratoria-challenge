import { 
        LOGIN_ACTION,
        HOME_ACTION
} from "../../constants/actions";

export const login = () => {
  return {
    type: LOGIN_ACTION.LOGIN_ACTION_LOGIN_USER,
  }
}

export const handleUserInfo = (value, id) => {
  return {
    type: LOGIN_ACTION.LOGIN_ACTION_HANDLE_USER_INFO,
    value,
    id
  }
}

export const showOptions = () => {
  return {
    type: HOME_ACTION.HOME_ACTION_SHOW_OPTIONS
  }
}

export const resetValues = () => {
  return {
    type: ''
  }
}
