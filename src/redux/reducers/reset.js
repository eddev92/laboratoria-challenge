import { RESET_ACTION } from "../../constants/actions";

let defaultState = {
  isValid: false,
  showOptions: false,
  optionSelected: 1,
  publicationMessage: '',
  publications: [],
  publicationSelected: false,
  messageForPublicationSelected: '',
  privacityForPublicationSelected: '',
  errorForSavePublication: false,
  editActive: false,
  publicationsLoadedState: false,
  invalidPassword: true
}

const reset = (state = defaultState, action) => {
  switch (action.type) {    
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

export default reset;
