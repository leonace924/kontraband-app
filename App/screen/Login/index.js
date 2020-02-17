import React from "react";
import { Alert } from "react-native";

import Login from "./Login";
import { connect } from 'react-redux';
import { loginUserData, onSocialLoginData } from '../../actions/AuthActions';
import {fetchPosts} from "../../actions/PostActions";

class LoginContainer extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.isSignedIn && this.props.isSignedIn) {
      this.props.navigation.navigate('Home', {
        fromLogin: true
      });
    }
    if (prevProps.error.length == 0 && this.props.error.length > 0) {
      Alert.alert('Error', this.props.error);
    }
  }

  render() {
    return (
      <Login loginUserData={this.props.loginUserData} onSocialLoginData={this.props.onSocialLoginData} />
    );
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: state.Auth.isSignedIn,
  error: state.Auth.error,
  loading: state.Auth.loading
})

const mapDispatchToProps = {
  loginUserData: loginUserData,
  onSocialLoginData: onSocialLoginData,
  fetchPosts
};

LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

export default LoginContainer;