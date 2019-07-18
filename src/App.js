import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import LoginComponent from './components/login';
import HomeComponent from './components/home';
import { 
	login,
	handleUserInfo,
	showOptions,
	selectOption,
	handlePublication,
	addPublication,
	deletePublication,
	editPublication,
	resetValues,
	resetOptionSelected,
	updatePublication,
	resetErrorSavePublication,
	resetEditPublication
} from './redux/actions';

class App extends Component {
  constructor(props) {
    super(props);

		this.state = {
			updated: false
		};
  }

  componentDidUpdate() {
		if (this.props.errorForSavePublication) {
			alert('Publicacion ya existe');
			return this.props.resetErrorSavePublication();
		}
		if (this.props.publications && this.props.publications.length === 0) {
			// return	this.props.resetEditPublication();
		}
		if (this.props.publicationSelected && this.props.publications.length === 0) {
			
			return	this.props.resetValues();
		}
  }

	loginUser = () => {
		const { user } = this.props;
		
		if (user && user.userName && user.password) {
			return this.props.loginUser();
		}
		return alert('Ambos campos son requeridos!');
	}
	handleChange = (e) => {
		if (e) {
			this.props.resetOptionSelected();
			const value = e.target.value;
			const id = e.target.id;
			return this.props.handleChange(value, id);
		}
		return null;
	}

	handlePublication = (e) => {
		return this.props.handlePublication(e.target.value);
	}

	showOptionsPublications = () => this.props.showOptionsPublications();
	selectOption = (option) => {
		if (option) {
			this.props.selectOption(option);
			return	this.props.showOptionsPublications();
		}
		 
	}
	
	sharePublication = () => {
		const { publication, publicationMessage, optionSelected } = this.props;

		if (publicationMessage) {
			return this.props.addPublication(publication);
		}
		return alert('Campo de publicacion es requerido!');
	}

	deletePublication = (publication) => {
		this.props.deletePublication(publication);
		return this.props.resetValues();
	}

	editPublication = (publicationSelected) => {
		return this.props.editPublication(publicationSelected);
	}
	updatePublication = () => {
		const { messageForPublicationSelected, optionSelected } = this.props;
		const body = {
			message: messageForPublicationSelected,
			privacity: optionSelected
		}
		console.log('editar publicacion}')
		this.props.updatePublication(body)
		return this.props.resetEditPublication();
	}
  render() {
    const { editActive, publicationMessage, user, isValid, showOptions, optionSelected, publication, publications, publicationSelected, messageForPublicationSelected, privacityForPublicationSelected } = this.props;
		console.log(this.props)

    return (
			<div className="App" 
			>
				<LoginComponent validateUser={this.loginUser} isValid={isValid} user={user} handleChange={this.handleChange} userName={user.userName} password={user.password} />
				<HomeComponent
					isValid={isValid}
					showOptions={showOptions}
					toggleOptions={this.showOptionsPublications}
					selectOption={this.selectOption}
					optionSelected={optionSelected}
					sharePublication={this.sharePublication}
					handlePublication={this.handlePublication}
					publication={publication}
					publications={publications}
					deletePublication={this.deletePublication}
					editPublication={this.editPublication}
					publicationSelected={publicationSelected}
					messageForPublicationSelected={messageForPublicationSelected}
					privacityForPublicationSelected={privacityForPublicationSelected}
					publicationMessage={publicationMessage}
					updatePublication={this.updatePublication}
					editActive={editActive}
				 />
  		</div>
  );  
}


}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
		isValid: state.auth.isValid,
		showOptions: state.auth.showOptions,
		optionSelected: state.auth.optionSelected,
		publication: state.auth.publication,
		publications: state.auth.publications,
		publicationSelected: state.auth.publicationSelected,
		publicationMessage: state.auth.publicationMessage,
		messageForPublicationSelected: state.auth.messageForPublicationSelected,
		privacityForPublicationSelected: state.auth.privacityForPublicationSelected,
		errorForSavePublication: state.auth.errorForSavePublication,
		editActive: state.auth.editActive
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
  	loginUser: () => { dispatch(login()) },
    handleChange: (value, id) => { dispatch(handleUserInfo(value, id)) },
    showOptionsPublications: () => { dispatch(showOptions()) },
    selectOption: (option) => { dispatch(selectOption(option)) },
    handlePublication: (value) => { dispatch(handlePublication(value)) },
		addPublication: (publication) => { dispatch(addPublication(publication)) },
    deletePublication: (publication) => { dispatch(deletePublication(publication)) },
    editPublication: (publication) => { dispatch(editPublication(publication)) },
    resetValues: () => { dispatch(resetValues()) },
    resetOptionSelected: () => { dispatch(resetOptionSelected()) },
    updatePublication: (publication) => { dispatch(updatePublication(publication)) },
    resetErrorSavePublication: () => { dispatch(resetErrorSavePublication()) },
    resetEditPublication: () => { dispatch(resetEditPublication()) },
    }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
