import { LOGIN_ACTION, HOME_ACTION } from "../../constants/actions";

let defaultState = {
  user: {
    userName: '',
    password: ''
  },
  isValid: false,
  showOptions: false,
  optionSelected: 1,
  publication: {
    message: '',
    privacity: 1
  },
  publications: []
}

const auth = (state = defaultState, action) => {
  console.log(action)
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
    case HOME_ACTION.HOME_ACTION_SHOW_OPTIONS:
      return {
        ...state,
        showOptions: !state.showOptions
      }
    case HOME_ACTION.HOME_ACTION_SELECT_OPTION:
      return {
        ...state,
        optionSelected: action.option
      }
    case HOME_ACTION.HOME_ACTION_HANDLE_PUBLICATION: 
      return {
        ...state,
        publication: action.value
    }
    case HOME_ACTION.HOME_ACTION_ADD_PUBLICATION: {
      let auxPublications = [ ...state.publications ];
      const publication = action.publication;
      const bodyPublication = {
        message: publication,
        privacity: state.optionSelected
      }
      auxPublications.push(bodyPublication);
      return {
        ...state,
        publications: auxPublications
      }
    }
    case HOME_ACTION.HOME_ACTION_DELETE_PUBLICATION: {
      const auxPublications = [ ...state.publications ];
      auxPublications.forEach((pub, index) => {
        console.log(pub)
        console.log(index)
        if ((pub.message === action.publication.message) && (action.publication.position === index)) {

          return auxPublications.splice(action.position, 1);
        } else {
         return auxPublications;
        }
      })
      return {
        ...state,
        publications: auxPublications
      }
    }

    default:
      return state
  }
}

export default auth
