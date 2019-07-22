import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import LoginComponent from './components/login';
import HomeComponent from './components/home';
import firebase from 'firebase';
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
	resetEditPublication,
	getPublications,
	updateListPublications,
	publicationsLoadedReset,
	publicationsLoaded,
	resetEditActive,
	resetInputValues,
	resetIsValid,
	resetIsInvalid
} from './redux/actions';
import config from './config';
import { USER_CREDENTIALS } from './constants/constants';
import LaboratoriaServices from './services/services';

firebase.initializeApp(config);
const publicationRef = firebase.database();
const ref =	publicationRef.ref('/');
const storage = window.localStorage;

class App extends Component {
  constructor(props) {
    super(props);

		this.state = {
			publications: [],
			ids: [],
			userNameStoraged: '',
			passwordStoraged: ''
		};
	}
	componentDidMount() {
			this.validateLogin();
	}
	componentWillMount() {
		const userNameStoraged = storage.getItem('username');
		const passwordStoraged = storage.getItem('password');

		if (!userNameStoraged && !passwordStoraged) {
			return storage.clear();
		}
	}
  componentDidUpdate() {
		if (this.props.isValid && !this.props.invalidPassword) {
			this.getPublicationFirebase();
			return this.props.resetIsInvalid();
		}

		if (this.props.publications.length > 0 && this.state.publications.length === 0) {
			const publications = [];
			return this.props.updateListPublications(publications);
		}	
		if (this.props.publicationsLoadedState && this.state.publications.length > 0) {
			let body = {id: '', message: '', privacity: ''};
			let aux = [];
			const list = Object.values(this.state.publications[0]);
				aux = list.map((elm, index) => {
					body = { id: this.state.ids[index], message: elm.publication.message, privacity: elm.publication.privacity };
					return body;
			 	})
			this.props.updateListPublications(aux);
			return this.props.publicationsLoadedReset();
		}
		if (this.props.errorForSavePublication) {
			alert('Publicacion ya existe');
			return this.props.resetErrorSavePublication();
		}
		if (this.props.editActive && this.props.publications && this.props.publications.length === 0) {
			return this.props.resetEditPublication();
		}
		if (this.props.publicationSelected && this.props.publications.length === 0) {			
			return	this.props.resetValues();
		}
	}
	validateLogin = () => {
		const userNameStoraged = storage.getItem('username');
		const passwordStoraged = storage.getItem('password');

		if (userNameStoraged && passwordStoraged) {
			this.setState({ userNameStoraged, passwordStoraged }, () => {
				return this.validateNow(userNameStoraged, passwordStoraged);
			});
		}
		return null;
	}
	validateNow = (userNameStoraged, passwordStoraged) => {
			if (userNameStoraged === USER_CREDENTIALS.userName && passwordStoraged === USER_CREDENTIALS.password) {			
				this.props.loginUser(userNameStoraged, passwordStoraged);
				this.getPublicationFirebase();
				return this.props.resetIsInvalid();
			}
			this.props.resetIsValid();
			return alert('Usuario y contraseña no coinciden');
	}
	getPublicationFirebase = () => {
		ref.on("value", (snapshot) => {
			if (snapshot.val() !== null) {
				return this.setState({publications: Object.values(snapshot.val()), ids: Object.keys(Object.values(snapshot.val())[0]) }, () => {
					this.props.publicationsLoaded();
				})
			}
			return this.setState({publications: []})
		}, (error) => {
			console.log("ERROR: " + error.code);
		});
	}
	loginUser = () => {
		const { user } = this.props;
		
		if (user && user.userName && user.password) {
			if (user.userName === USER_CREDENTIALS.userName && user.password === USER_CREDENTIALS.password) {
				storage.setItem('username', user.userName.toString())
				storage.setItem('password', user.password)
				return this.props.loginUser();
			}
			return alert('Usuario y contraseña no coinciden')
		}
		return alert('Ambos campos son requeridos!');
	}
	logout = () => {
		storage.clear();
		this.setState({ userNameStoraged: '', passwordStoraged: '' });
		return this.props.resetIsValid();
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
		const { optionSelected, publications, publicationMessage, messageForPublicationSelected } = this.props;
		const service = new LaboratoriaServices(ref);
		let result = false;

		if (!publicationMessage || !messageForPublicationSelected) { 
			return alert('Campo de publicacion es requerido!');
		} else if (publications.length > 0) {
			publications.forEach(pub => {
				if (pub.message === publicationMessage && pub.privacity === optionSelected) {
					result = true;
					return result;
				}
			})
		}
		if (!result) {
			const body = {
				message: publicationMessage,
				privacity: optionSelected
			}

			service.savePublication(body)
			 return this.props.addPublication();
		}
		return alert('Publicacion ya existe!')
	}

	deletePublication = (publication) => {
		const service = new LaboratoriaServices(ref);
		this.props.deletePublication(publication);
		return	service.deletePublicationDB(publication);
	}

	editPublication = (publicationSelected) => {
		return this.props.editPublication(publicationSelected);
	}
	updatePublication = () => {
		const { messageForPublicationSelected, optionSelected, publication } = this.props;
		if (messageForPublicationSelected && messageForPublicationSelected === publication.message && optionSelected === publication.privacity) {
			return alert('Campos identicos')
		}
		if (messageForPublicationSelected) {
			const service = new LaboratoriaServices(ref);
			const body = {
				message: messageForPublicationSelected,
				privacity: optionSelected
			}
			service.updatePublicationDB(publication.id, body)
			this.props.updatePublication(body)
			return this.props.resetEditPublication();

		}
		return alert('Campo comentario es requerido!')
	}

	cancelUpdatePublication = () => {
		this.props.resetEditActive();
		return this.props.resetEditPublication();
	}

  render() {
    const { editActive, publicationMessage, user, isValid, showOptions, optionSelected, publication, publications, publicationSelected, messageForPublicationSelected, privacityForPublicationSelected } = this.props;

		return (
			<div className="App" 
			>
				<LoginComponent
				validateUser={this.loginUser}
				isValid={isValid}
				user={user}
				handleChange={this.handleChange}
				userName={user.userName}
				password={user.password}
				/>
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
					cancelUpdatePublication={this.cancelUpdatePublication}
					logout={this.logout}
				 />
  		</div>
  );  
}


}
const mapStateToProps = (state) => {
  return {
    user: state.laboratoria.user,
		isValid: state.laboratoria.isValid,
		showOptions: state.laboratoria.showOptions,
		optionSelected: state.laboratoria.optionSelected,
		publication: state.laboratoria.publication,
		publications: state.laboratoria.publications,
		publicationSelected: state.laboratoria.publicationSelected,
		publicationMessage: state.laboratoria.publicationMessage,
		messageForPublicationSelected: state.laboratoria.messageForPublicationSelected,
		privacityForPublicationSelected: state.laboratoria.privacityForPublicationSelected,
		errorForSavePublication: state.laboratoria.errorForSavePublication,
		editActive: state.laboratoria.editActive,
		publicationsLoadedState: state.laboratoria.publicationsLoadedState,
		invalidPassword: state.laboratoria.invalidPassword,
		isLoading: state.laboratoria.isLoading
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
  	loginUser: (user, password) => { dispatch(login(user, password)) },
    handleChange: (value, id) => { dispatch(handleUserInfo(value, id)) },
    showOptionsPublications: () => { dispatch(showOptions()) },
    selectOption: (option) => { dispatch(selectOption(option)) },
    handlePublication: (value) => { dispatch(handlePublication(value)) },
		addPublication: () => { dispatch(addPublication()) },
    deletePublication: (publication) => { dispatch(deletePublication(publication)) },
    editPublication: (publication) => { dispatch(editPublication(publication)) },
    resetValues: () => { dispatch(resetValues()) },
    resetOptionSelected: () => { dispatch(resetOptionSelected()) },
    updatePublication: (publication) => { dispatch(updatePublication(publication)) },
    resetErrorSavePublication: () => { dispatch(resetErrorSavePublication()) },
    resetEditPublication: () => { dispatch(resetEditPublication()) },
    getPublications: (publicationsAux) => { dispatch(getPublications(publicationsAux)) },
    updateListPublications: (publications) => { dispatch(updateListPublications(publications)) },
    publicationsLoaded: () => { dispatch(publicationsLoaded()) },
    publicationsLoadedReset: () => { dispatch(publicationsLoadedReset()) },
    resetEditActive: () => { dispatch(resetEditActive()) },
    resetInputValues: () => { dispatch(resetInputValues()) },
		resetIsValid: () => { dispatch(resetIsValid()) },
		resetIsInvalid: () => { dispatch(resetIsInvalid()) },
    }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
