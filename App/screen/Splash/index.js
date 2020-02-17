import React from "react";
import { AsyncStorage } from "react-native";
import { connect } from 'react-redux';

import Splash from "./Splash";
import { loginUserData, onSocialLoginData } from '../../actions/AuthActions';
import { USER_FB, USER_GG, USER_NORMAL } from "../../constants/constants";

class SplashContainer extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.isSignedIn && this.props.isSignedIn) {
      this.props.navigation.navigate('Home')
    }
    if (prevProps.error.length == 0 && this.props.error.length > 0) {
      Alert.alert('Error', this.props.error);
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@KBLoginInfo').then( res => {
      if(res == null) {
        this.props.navigation.navigate('Home')
      } else {
        const { type, data } = JSON.parse(res);
        if(type == USER_NORMAL) {
          this.props.loginUserData(data);
        } else {
          this.props.onSocialLoginData(data);
        }
      }
    })
  }
  

  render() {
    return <Splash />
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: state.Auth.isSignedIn,
  error: state.Auth.error,
  loading: state.Auth.loading
})

const mapDispatchToProps = (dispatch) => {
  return {
    loginUserData: p => dispatch(loginUserData(p)),
    onSocialLoginData: p => dispatch(onSocialLoginData(p)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashContainer)

