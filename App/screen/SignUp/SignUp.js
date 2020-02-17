import React, { Component } from "react";
import { Image, Text, View, TouchableOpacity, Alert } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import styles from "./styles";
import { withNavigation } from 'react-navigation';
import InputField from "../../components/InputField";
import { tracking } from '../../utils/functions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userName: "",
      switchValue: false,
      loginSwitch: false,
      fullView: true
    };
  }

  componentDidMount(){
    tracking('Login');
  }

  _handleInput = name => text =>
    this.setState({ [name]: text }, () => {
    });

  pressSubmit = () => {
    let body = {
      user: {
        username: this.state.userName,
        password: this.state.password,
        email: this.state.email,
      }
    }
    if (this.state.userName.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0) {
      this.props.signUpUser(body);
    } else {
      this.setState({ stateColor: false })
      Alert.alert("Alert!", 'Please fill all field')
    }
  }

  navigateToBack = () => this.props.navigation.navigate('Login');
  navigateToHome = () => this.props.navigation.navigate('Home');

  render() {
    return (
      <View style={styles.signUpMainView}>
        <View style={styles.signUpBodyView}>
          <View style={styles.headerBar}>
            <Text style={[styles.logInText]}>SIGNUP</Text>
            <TouchableOpacity
              onPress={this.navigateToBack}
            >
              <FontAwesome5 name="times" color="#191313" size={20} />
            </TouchableOpacity>
          </View>
          <InputField
            I={<FontAwesome5 name={'user-ninja'} size={15} color="#c4201b" />}
            fieldName="User Name"
            name={this.state.UserName}
            _handleInput={() => this._handleInput('userName')}
          />
          <InputField
            I={<FontAwesome5 name={'envelope'} size={15} color="#c4201b" />}
            fieldName="Email"
            name={this.state.email}
            _handleInput={() => this._handleInput('email')}
          />
          <InputField
            I={<FontAwesome5 name={'key'} size={15} color="#c4201b" />}
            fieldName="Password"
            textSecure={true}
            name={this.state.password}
            _handleInput={() => this._handleInput('password')}
          />
        </View>
        <TouchableOpacity
          onPress={() => this.pressSubmit()}
          style={styles.buttonView}>
          <Text style={styles.signupText} >SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Login);