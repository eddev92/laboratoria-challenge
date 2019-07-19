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
	publicationsLoaded
} from './redux/actions';
import config from './config';

firebase.initializeApp(config);
const publicationRef = firebase.database();
const ref =	publicationRef.ref('/');

class App extends Component {
  constructor(props) {
    super(props);

		this.state = {
			updated: false,
			publications: [],
			ids: []
		};
	}
	componentWillUpdate(nextProps) {
		console.log(this.props.publications)
		console.log(this.state.publications)
			
	}
	componentWillMount() {
			this.getPublicationFirebase();
	}
  componentDidUpdate() {
		if (this.props.publications.length > 0 && this.state.publications.length === 0) {
			console.log('entro')
			const publications = [];
			return this.props.updateListPublications(publications);
		}	
		if (this.props.publicationsLoadedState && this.state.publications.length > 0) {
			let body = {id: '', message: '', privacity: ''};
			let aux = [];
			const list = Object.values(this.state.publications[0]);
				aux = list.map((elm, index) => {
					 console.log(`${elm}`)
					return body = { id: this.state.ids[index], message: elm.publication.message, privacity: elm.publication.privacity };
			 	})
			console.log('ya hay mas de 1 publicacion', aux)
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
	savePublication = (publication) => {
		const publicationsRef = ref.child("publications");
		console.log(publication)
		publicationsRef.push({publication});
	}
	updatePublicationDB = (publication) => {
		console.log(publication)
		const publicationsRef = ref.child("publications");

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
		const { publication, optionSelected, publications, publicationMessage, errorForSavePublication } = this.props;
		let result = false;
		console.log(publication)
		if (!publicationMessage) { 
			return alert('Campo de publicacion es requerido!');
		} else if (publications.length > 0) {
			publications.forEach(pub => {
				if (pub.message === publicationMessage && pub.privacity === optionSelected) {
					result = true;
			} else {          
				result = false;
				}
			})
		}
		if (!result) {
			const body = {
				message: publicationMessage,
				privacity: optionSelected
			}

	 		console.log(body)
	 		this.savePublication(body)
			return this.props.addPublication();
		}
		return alert('Publicacion ya existe!')
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
		if (messageForPublicationSelected) {
			const body = {
				message: messageForPublicationSelected,
				privacity: optionSelected
			}
			this.props.updatePublication(body)
			return this.props.resetEditPublication();

		}
		return alert('Campo comentario es requerido!')
	}
  render() {
    const { editActive, publicationMessage, user, isValid, showOptions, optionSelected, publication, publications, publicationSelected, messageForPublicationSelected, privacityForPublicationSelected } = this.props;
		console.log(this.state.publications)
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
		editActive: state.auth.editActive,
		publicationsLoadedState: state.auth.publicationsLoadedState
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
  	loginUser: () => { dispatch(login()) },
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
    publicationsLoadedReset: () => { dispatch(publicationsLoadedReset()) }
    }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
