import React from "react";
import { View, YellowBox } from 'react-native'

import SignUp from './SignUp';
import styles from "./styles";
import { connect } from "react-redux";
import Loader from '../../components/Loader';
import { signUpUser } from "../../actions/AuthActions";

class SignUpContainer extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings(
      ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isSignedIn && this.props.isSignedIn) {
      this.props.navigation.navigate('Home', { fromLogin: true })
    }
  }

  render() {
    return (
      <SignUp signUpUser={this.props.signUpUser} />
    );
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: state.Auth.isSignedIn,
  loading: state.Auth.loading,
})

const mapDispatchToProps = {
  signUpUser: signUpUser,
};

SignUpContainer = connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
export default SignUpContainer;
