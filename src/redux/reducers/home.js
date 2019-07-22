import { HOME_ACTION } from "../../constants/actions";

let defaultState = {
  showOptions: false,
  optionSelected: 1,
  publicationMessage: '',
  publication: {
    id: '',
    message: '',
    privacity: 1
  },
  publications: [],
  publicationSelected: false,
  messageForPublicationSelected: '',
  privacityForPublicationSelected: '',
  errorForSavePublication: false,
  editActive: false,
  publicationsLoadedState: false,
}

const home = (state = defaultState, action) => {
  switch (action.type) {    
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
    default:
      return state
  }
}

export default home;
