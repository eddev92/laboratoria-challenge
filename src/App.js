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
	resetErrorSavePublication
} from './redux/actions';

class App extends Component {
  constructor(props) {
    super(props);

		this.state = {
			updated: false
		};
  }

  componentDidUpdate() {
		console.log(this.props.errorForSavePublication)
		if (this.props.errorForSavePublication) {
			alert('Publicacion ya existe');
			return this.props.resetErrorSavePublication();
		}
		 if (this.props.publication.message !== this.props.messageForPublicationSelected) {
		 	return	this.props.resetOptionSelected();
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
		this.props.selectOption(option);
		return	this.props.showOptionsPublications();
		 
	}
	
	sharePublication = () => {
		const { publication, publicationSelected, messageForPublicationSelected, optionSelected } = this.props;
		const body = {
			message: messageForPublicationSelected,
			privacity: optionSelected
		}

		if (publicationSelected) return this.props.updatePublication();
		if (publication) return this.props.addPublication(publication);
		// return null;
	}

	deletePublication = (publication) => {
		this.props.deletePublication(publication);
		return this.props.resetValues();
	}

	editPublication = (publicationSelected) => {
		return this.props.editPublication(publicationSelected);
	}

  render() {
    const { publicationMessage, user, isValid, showOptions, optionSelected, publication, publications, publicationSelected, messageForPublicationSelected, privacityForPublicationSelected } = this.props;
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
		errorForSavePublication: state.auth.errorForSavePublication
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
    updatePublication: (newMessage, newPrivacity) => { dispatch(updatePublication(newMessage, newPrivacity)) },
    resetErrorSavePublication: () => { dispatch(resetErrorSavePublication()) },
    }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
