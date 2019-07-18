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
  messageForPublicationSelected: '',
  privacityForPublicationSelected: '',
  errorForSavePublication: false,
  editActive: false
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
    case HOME_ACTION.HOME_ACTION_SHOW_OPTIONS:
      return {
        ...state,
        showOptions: !state.showOptions
      }
    case HOME_ACTION.HOME_ACTION_SELECT_OPTION:
      return {
        ...state,
        optionSelected: action.option,
        publicationSelected: false
        // publicationSelected: false
      }
    case HOME_ACTION.HOME_ACTION_HANDLE_PUBLICATION:
      return {
        ...state,
        publicationMessage: action.value,
        messageForPublicationSelected: action.value,
        privacityForPublicationSelected: state.optionSelected,
        publicationSelected: false
      }
    case HOME_ACTION.HOME_ACTION_ADD_PUBLICATION: {
      let auxPublications = [ ...state.publications ];
      let result = false;
      const bodyPublication = {
        message: state.publicationMessage,
        privacity: state.optionSelected
      }
// if (auxPublications.length > 0) {
        auxPublications.forEach(pub => {
          if (pub.message === bodyPublication.message && pub.privacity === bodyPublication.privacity) {
            result = true;
        } else {          
          result = false;
          }
        })
      if (!result) auxPublications.push(bodyPublication);
      return {
        ...state,
        publications: auxPublications,
        errorForSavePublication: result
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
        publications: auxPublications,
      }
    }
    case HOME_ACTION.HOME_ACTION_EDIT_PUBLICATION: {
      const lastPublication = { ...state.publication };
      lastPublication.message = action.publicationSelected.message;
      lastPublication.privacity = action.publicationSelected.privacity;
      
      return {
        ...state,
        publicationSelected: true,
        editActive: true,
        publication: lastPublication,
        messageForPublicationSelected: lastPublication.message,
        optionSelected: lastPublication.privacity,
      }
    }
  case RESET_ACTION.RESET_ACTION_NOW: {
    const auxMessage = '';
    const lastPublication = { 
      message: '',
      privacity: 1
     };
     let result = false;
     if (state.publications.length === 0) {
       result = true
     }
    return {
      ...state,
      publicationSelected: false,
      publication: lastPublication,
      optionSelected: 1,
      publicationMessage: '',
      messageForPublicationSelected: result ? auxMessage : '',
      // editActive: !result

    }
  }
  case RESET_ACTION.RESET_OPTION_SELECTED:
    return {
      ...state,
      publicationSelected: false,

    }
  case HOME_ACTION.HOME_ACTION_UPDATE_PUBLICATION: {
    const publicationAux = { ...state.publication };

    publicationAux.message = action.publication.message;
    publicationAux.privacity = action.publication.privacity;
    const publications = state.publications.map(pub => {
      if (pub.message === state.publication.message && pub.privacity === state.publication.privacity) {
        pub = publicationAux;
      }
      return pub;
    })
    return {
      ...state,
      publications,
      publicationSelected: false
      }
  }
  case RESET_ACTION.RESET_ACTION_RESTART_ERROR_SAVE_PUBLICATION:
    return {
      ...state,
      errorForSavePublication: false
    }
  case RESET_ACTION.RESET_ACTION_RESET_EDIT_PUBLICATION:
  return {
    ...state,
    editActive: false,
    publicationMessage: '',
    optionSelected: 1,
  }
    default:
      return state
  }
}

export default auth
