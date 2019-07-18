import { LOGIN_ACTION, HOME_ACTION, RESET_ACTION } from "../../constants/actions";

let defaultState = {
  user: {
    userName: '',
    password: ''
  },
  isValid: false,
  showOptions: false,
  optionSelected: 1,
  publicationMessage: '',
  publication: {
    message: '',
    privacity: 1
  },
  publications: [],
  publicationSelected: false,
  newMessageForPublicationSelected: '',
  newPrivacityForPublicationSelected: ''
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
        publicationMessage: action.value,
        newMessageForPublicationSelected: action.value,
        newPrivacityForPublicationSelected: state.optionSelected,
        // publicationSelected: (action.value === state.publicationMessage)
      }
    case HOME_ACTION.HOME_ACTION_ADD_PUBLICATION: {
      let auxPublications = [ ...state.publications ];
      const bodyPublication = {
        message: state.publicationMessage,
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

      for (let i = 0; i < auxPublications.length; i++) {
        if ((auxPublications[i].message === action.publication.message) && (action.publication.position === i)) {
          auxPublications.splice(i, 1);
        }
      }
 
      return {
        ...state,
        publications: auxPublications
      }
    }
    case HOME_ACTION.HOME_ACTION_EDIT_PUBLICATION: {
      const lastPublication = { ...state.publication };
      console.log(lastPublication, 'lastPublication')
      lastPublication.message = action.publicationSelected.message;
      lastPublication.privacity = action.publicationSelected.privacity;
      return {
        ...state,
        publicationSelected: true,
        publication: lastPublication,
        // publicationMessage: lastPublication.message,
        newMessageForPublicationSelected: lastPublication.message,
        optionSelected: lastPublication.privacity,
      }
    }
  case RESET_ACTION.RESET_ACTION_NOW: {
    const lastPublication = { 
      message: '',
      privacity: 1
     };
    return {
      ...state,
      publicationSelected: false,
      publication: lastPublication,
      optionSelected: 1
    }
  }
  case RESET_ACTION.RESET_OPTION_SELECTED:
    return {
      ...state,
      publicationSelected: false
    }
    default:
      return state
  }
}

export default auth
