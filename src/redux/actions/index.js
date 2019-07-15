import { LOGIN_ACTIONS } from "../../constants/actions";

export const Login = (comment, index) => {
  return {
    type: LOGIN_ACTIONS.LOGIN_ACTIONS_DELETE_COMMENT,
    comment,
    position: index
  }
}
