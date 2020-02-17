import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

import styles from "./styles";
import InputFieldWithBorder from "../../components/InputFieldWithBorder";

export default class SettingForms extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
    }
  }

  componentDidMount() {
    this.setState({
      email: this.props.userDetail.email,
      username: this.props.userDetail.username,
    });
  }

  _handleInput = (name, text) => this.setState({ [name]: text });

  pressSubmit = () => {
    const { email, username, password, password_confirmation } = this.state;
    if (email.length && username.length && password.length && password_confirmation.length) {
      if (password != password_confirmation) {
        Alert.alert("Alert!", 'Password Confirm does not match')
      }
      const body = {
        user: {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        }
      }

      this.props.updateProfile(body);
    } else {
      Alert.alert("Alert!", 'Please fill all field')
    }
  }

  handleDelete = () => {
    this.props.deleteUser();
  }

  pressDelete = () => {
    Alert.alert(
      'Are you sure?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel'),
          style: 'cancel',
        },
        {
          text: 'OK', onPress: this.handleDelete
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={styles.settingFormView}>
        <InputFieldWithBorder
          name={this.state.email}
          label="Change E-Mail-Address"
          _handleInput={(text) => this._handleInput('email', text)} />
        <InputFieldWithBorder
          name={this.state.username}
          label="Change username"
          _handleInput={(text) => this._handleInput('username', text)} />
        <InputFieldWithBorder
          name={this.state.password}
          textSecure={true}
          label="Password"
          _handleInput={(text) => this._handleInput('password', text)} />
        <InputFieldWithBorder
          name={this.state.password_confirmation}
          textSecure={true}
          label="Confirm password"
          _handleInput={(text) => this._handleInput('password_confirmation', text)} />

        <TouchableOpacity
          onPress={() => this.pressSubmit()}
          style={[styles.buttonView, styles.buttonView_marginTop]}>
          <Text style={styles.btnText} >SAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.pressDelete()}
          style={[styles.buttonView, styles.buttonView_marginTop]}>
          <Text style={styles.btnText} >DELETE</Text>
        </TouchableOpacity>
      </View>
    )
  }
}