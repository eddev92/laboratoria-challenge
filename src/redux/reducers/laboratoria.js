import { LOGIN_ACTION, HOME_ACTION, RESET_ACTION } from "../../constants/actions";
import { defaultValues } from "../../constants/constants";

let defaultState = defaultValues;

const laboratoria = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_ACTION.LOGIN_ACTION_LOGIN_USER: {
      return {
        ...state,
        user: state.user,
        isLoading: true,
        invalidPassword: (state.user.userName !== 'laboratoria' && state.user.password !== 'laboratoria123') ? true : false,
        isValid: ((action.user === 'laboratoria' && action.password === 'laboratoria123') ||
         (state.user.userName === 'laboratoria' && state.user.password === 'laboratoria123')) ? true : false
      }
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
      }
    case HOME_ACTION.HOME_ACTION_HANDLE_PUBLICATION: {      
      const aux = [ ...state.publications ];
      return {
        ...state,
        publicationMessage: action.value,
        messageForPublicationSelected: action.value,
        privacityForPublicationSelected: state.optionSelected,
        publicationSelected: false,
        publications: aux
      }
    }

    case HOME_ACTION.HOME_ACTION_ADD_PUBLICATION: {
      let auxPublications = [ ...state.publications ];
      let result = false;
      const bodyPublication = {
        message: state.publicationMessage,
        privacity: state.optionSelected
      }
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
        publications: auxPublications.reverse(),
        errorForSavePublication: result,
        messageForPublicationSelected: '',
        publicationMessage: '',
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
        publicationSelected: !(state.publicationSelected && state.editActive) ? false : true,
        editActive: !(state.publicationSelected && state.editActive) ? false : true
      }
    }
    case HOME_ACTION.HOME_ACTION_EDIT_PUBLICATION: {
      const lastPublication = { ...state.publication };
      const aux = [ ...state.publications ];
      lastPublication.id = action.publicationSelected.id;
      lastPublication.message = action.publicationSelected.message;
      lastPublication.privacity = action.publicationSelected.privacity;

      return {
        ...state,
        publicationSelected: true,
        editActive: true,
        publication: lastPublication,
        messageForPublicationSelected: lastPublication.message,
        optionSelected: lastPublication.privacity,
        publications: aux
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
    const aux = [ ...publications ].reverse();

    return {
      ...state,
      publications: aux,
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
      messageForPublicationSelected: '',
      optionSelected: 1,
      publication: {id: '', message: '', privacity: 1}
    }
  case HOME_ACTION.HOME_ACTION_GET_PUBLICATIONS: {
    let aux = [ ...state.publications ];
    aux = action.publications;
    return {
      ...state,
      publications: aux.reverse()
    }
  }
  case HOME_ACTION.HOME_ACTION_PUBLICATIONS_LOADED:
    return {
      ...state,
      publicationsLoadedState: true
    }
  case HOME_ACTION.HOME_ACTION_PUBLICATIONS_LOADED_RESET:
    return {
      ...state,
      publicationsLoadedState: false
    }
  case RESET_ACTION.RESET_EDIT_ACTIVE:
    return {
      ...state,
      editActive: false
    }
  case RESET_ACTION.INPUT_VALUES:
  return {
    ...state,
    editActive: false,
    publicationMessage: '',
    messageForPublicationSelected: '',
    optionSelected: 1
  }
case RESET_ACTION.RESET_ACTION_RESET_LOGIN_VALIDATION: {
  const userReset = {
    userName: '',
    password: ''
  }
  return {
    ...state,
    isValid: false,
    user: userReset,
    isLoading: false,
    publications: []
  }
}
case RESET_ACTION.RESET_ACTION_RESET_IS_INVALID:
  return {
    ...state,
    invalidPassword: true,
    isLoading: false
  }
    default:
      return state
  }
}

export default laboratoria;
