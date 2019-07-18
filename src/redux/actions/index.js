import { 
        LOGIN_ACTION,
        HOME_ACTION,
        RESET_ACTION
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
    type: RESET_ACTION.RESET_ACTION_NOW
  }
}

export const selectOption = (option) => {
  return {
    type: HOME_ACTION.HOME_ACTION_SELECT_OPTION,
    option
  }
}

export const handlePublication = (value) => {
  return {
    type: HOME_ACTION.HOME_ACTION_HANDLE_PUBLICATION,
    value
  }
}

export const addPublication = (publication) => {
  return {
    type: HOME_ACTION.HOME_ACTION_ADD_PUBLICATION,
    publication
  }
}

export const deletePublication = (publication) => {
  console.log(publication)
  return {
    type: HOME_ACTION.HOME_ACTION_DELETE_PUBLICATION,
    publication
  }
}

export const editPublication = (publicationSelected) => {
  return {
    type: HOME_ACTION.HOME_ACTION_EDIT_PUBLICATION,
    publicationSelected
  }
}

export const resetOptionSelected = () => {
  return {
    type: RESET_ACTION.RESET_OPTION_SELECTED
  }
}

export const resetErrorSavePublication = () => {
  return {
    type: RESET_ACTION.RESET_ACTION_RESTART_ERROR_SAVE_PUBLICATION
  }
}

export const updatePublication = (publication) => {
  return {
    type: HOME_ACTION.HOME_ACTION_UPDATE_PUBLICATION,
    publication
  }
}

export const resetEditPublication = () => {
  return {
    type: RESET_ACTION.RESET_ACTION_RESET_EDIT_PUBLICATION,
  }
}
