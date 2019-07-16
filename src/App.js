import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import LoginComponent from './components/login';
import HomeComponent from './components/home';
import { ROUTE_IMG_BACKGROUND } from './constants/constants';
import { login, handleUserInfo } from './redux/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

	loginUser = () => {
		return this.props.loginUser();
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

  render() {
    const { user, isValid } = this.props;

		console.log(this.props)
    return (
      <div className="App" style={{backgroundImage: `url(${ROUTE_IMG_BACKGROUND})`}}>
				<LoginComponent validateUser={this.loginUser} isValid={isValid} user={user} handleChange={this.handleChange} userName={user.userName} password={user.password} />
				<HomeComponent isValid={isValid}/>
  		</div>
  );  
}


}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isValid: state.auth.isValid,
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
  	loginUser: () => { dispatch(login()) },
    handleChange: (value, id) => { dispatch(handleUserInfo(value, id)) },
    // saveComment: (comment) => { dispatch(addComment(comment)) },
    // deleteComment: (comment, index) => { dispatch(deleteComment(comment, index)) },
    // getComments: (comments) => { dispatch(getComments(comments)) }
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
