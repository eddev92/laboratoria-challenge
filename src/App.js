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
	resetOptionSelected
} from './redux/actions';

class App extends Component {
  constructor(props) {
    super(props);

		this.state = {};
  }

  componentDidUpdate() {
		console.log('entro')
		// if (this.props.publication.message !== this.props.publicationMessage) {
		// 	return	this.props.resetOptionSelected();
		// }
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
		const { publication } = this.props;
		if (publication) return this.props.addPublication(publication);
		return null;
	}

	deletePublication = (publication) => {
		return this.props.deletePublication(publication);
	}

	editPublication = (publicationSelected) => {
		return this.props.editPublication(publicationSelected);
	}

  render() {
    const { publicationMessage, user, isValid, showOptions, optionSelected, publication, publications, publicationSelected, newMessageForPublicationSelected, newPrivacityForPublicationSelected } = this.props;
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
					newMessageForPublicationSelected={newMessageForPublicationSelected}
					newPrivacityForPublicationSelected={newPrivacityForPublicationSelected}
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
		newMessageForPublicationSelected: state.auth.newMessageForPublicationSelected,
		newPrivacityForPublicationSelected: state.auth.newPrivacityForPublicationSelected
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
    resetOptionSelected: () => { dispatch(resetOptionSelected()) }
    }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
