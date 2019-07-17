import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import LoginComponent from './components/login';
import HomeComponent from './components/home';
import { ROUTE_IMG_BACKGROUND } from './constants/constants';
import { login, handleUserInfo, showOptions, selectOption, handlePublication, addPublication, deletePublication } from './redux/actions';

class App extends Component {
  constructor(props) {
    super(props);

		this.state = {};
  }

  componentDidMount() {
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
			console.log(e)
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
		console.log(option)
		this.props.selectOption(option);
		return	this.props.showOptionsPublications();
		 
	}
	
	sharePublication = () => {
		const { publication } = this.props;
		if (publication) return this.props.addPublication(publication);
		return null;
	}

	deletePublication = (publication) => {
		console.log(publication)
		return this.props.deletePublication(publication);
	}

  render() {
    const { user, isValid, showOptions, optionSelected, publication, publications } = this.props;
		console.log(this.props)

    return (
			<div className="App" 
			// style={{backgroundImage: `url(${ROUTE_IMG_BACKGROUND})`}}
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
		publications: state.auth.publications
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
    deletePublication: (publication) => { dispatch(deletePublication(publication)) }
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
