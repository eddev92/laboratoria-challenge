import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';
import LoginComponent from './components/login';
import HomeComponent from './components/home';
import { ROUTE_IMG_BACKGROUND } from './constants/constants';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    // const {  } = this.state;

    return (
      <div className="App" style={{backgroundImage: `url(${ROUTE_IMG_BACKGROUND})`}}>
				<LoginComponent />
				<HomeComponent />
  		</div>
  );  
}


}
const mapStateToProps = (state, props) => {
  return {
    user: state.comments.comment,
    // comments: state.comments.comments,
    // showAddComment: state.comments.showAddComment,
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    // toggleAddComment: () => { dispatch(showAddComment()) },
    // handleComment: (comment) => { dispatch(handleComment(comment)) },
    // saveComment: (comment) => { dispatch(addComment(comment)) },
    // deleteComment: (comment, index) => { dispatch(deleteComment(comment, index)) },
    // getComments: (comments) => { dispatch(getComments(comments)) }
  }
}

export default App = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
