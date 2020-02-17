import React, { PureComponent } from "react";
import {Alert, Image, Text, TouchableOpacity, View, SafeAreaView, AsyncStorage} from "react-native";

import styles from "./styles";
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { withNavigation } from 'react-navigation';
import InputField from '../../components/InputField';
import * as socialLoginConfig from '../../config/SocialLogin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import md5 from 'md5';
import { FontAwesome5 } from '@expo/vector-icons';
import { tracking } from '../../utils/functions';
import * as AppAuth from 'expo-app-auth';
import { USER_FB, USER_GG, USER_NORMAL } from '../../constants/constants';

class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      switchValue: false,
      loginSwitch: false,
      fullView: true,
      tag: null
    };
  }

  componentDidMount() {
    tracking('Login');
    if (this.props.navigation.state.params != undefined && this.props.navigation.state.params.tag) {
      this.setState({ tag: this.props.navigation.state.params.tag })
    }
  }

  _handleInput = name => text =>
    this.setState({ [name]: text }, () => {
    });

  pressSubmit = async () => {
    this.setState({ loading: true });
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let bodyData = {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    };

    const loginInf = {
      type : USER_NORMAL,
      data : bodyData
    }

    await AsyncStorage.setItem('@KBLoginInfo', JSON.stringify(loginInf));

    if (reg.test(this.state.email) && this.state.password) {
      this.props.loginUserData(bodyData);
    } else {
      Alert.alert('Alert!', "Please enter valid email and password")
    }
  };

  navigateToSignUp = () => this.props.navigation.navigate('SignUp');

  navigateToHome = () => {
    this.props.navigation.navigate('Home',
      this.state.tag ?
        {
          fromTags: true,
          refresh : false,
          params: {
            section: 'tags',
            page: 1,
            tags: this.state.tag,
            date: '',
          }
        } : null
    )
  }

  signInFacebook = async () => {
    try {
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync(socialLoginConfig.facebookId, {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const response = await fetch(`${socialLoginConfig.facebookUrl}?access_token=${token}`)
          .then(result => result.json());
        let bodyData = {}
        bodyData.user = {}
        bodyData.hash = this.getHash(response.id)
        bodyData.provider = socialLoginConfig.providerFacebook
        bodyData.uid = response.id
        bodyData.user.username = response.name

        const loginInf = {
          type : USER_FB,
          data : bodyData
        }
        await AsyncStorage.setItem('@KBLoginInfo', JSON.stringify(loginInf));
        this.props.onSocialLoginData(bodyData)
      }
    } catch ({ message, ...error }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  signInGoogle = async () => {
    const { type, user } = await Google.logInAsync({
      iosClientId: socialLoginConfig.iosClientId,
      androidClientId: socialLoginConfig.androidClientId,
      iosStandaloneAppClientId: socialLoginConfig.iosStandaloneAppClientId,
      androidStandaloneAppClientId: socialLoginConfig.androidStandaloneAppClientId,
      clientId: socialLoginConfig.androidStandaloneAppClientId,
      redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`
    });

    if (type === 'success') {
      let bodyData = {}
      bodyData.user = {}
      bodyData.hash = this.getHash(user.id)
      bodyData.provider = socialLoginConfig.providerGoogle
      bodyData.uid = user.id
      bodyData.user.username = user.name
      bodyData.user.email = user.email
      bodyData.user.image = user.photoUrl
      const loginInf = {
        type : USER_GG,
        data : bodyData
      }
      await AsyncStorage.setItem('@KBLoginInfo', JSON.stringify(loginInf));
      this.props.onSocialLoginData(bodyData)
    }
  }

  getHash(id) {
    return md5(socialLoginConfig.SALT + id);
  }

  render() {
    return (
      <SafeAreaView style={styles.loginMainContainer}>
        <KeyboardAwareScrollView enableOnAndroid style={styles.mainContainer}>
          <View style={styles.headerBar}>
            <Text style={[styles.logInText]}>LOGIN</Text>
            <TouchableOpacity onPress={this.navigateToHome}>
              <FontAwesome5 name="times" color="#191313" style={styles.closeLoginButton} size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.logInText}>SOCIAL LOGIN</Text>
          <TouchableOpacity style={styles.googleImage} onPress={this.signInGoogle}>
            <Image
              style={styles.crossImage}
              source={require("../../assets/images/Google.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.fbImage} onPress={this.signInFacebook}>
            <Image
              style={styles.crossImage}
              source={require("../../assets/images/fb.png")}
            />
          </TouchableOpacity>
          <View style={styles.mainSeparator}>
            <View style={styles.separatorView} />
            <Text style={styles.separatorText}>OR</Text>
            <View style={styles.separatorView} />
          </View>
          <InputField
            I={<FontAwesome5 name={'user-ninja'} size={15} color="#c4201b" />}
            fieldName="Username"
            name={this.state.email}
            _handleInput={() => this._handleInput('email')}
          />
          <InputField
            I={<FontAwesome5 name={'key'} size={15} color="#c4201b" />}
            src='Password.png'
            fieldName="Password"
            textSecure={true}
            name={this.state.password}
            _handleInput={() => this._handleInput('password')}
          />
          <TouchableOpacity
            onPress={() => this.pressSubmit()}
            style={styles.logInButton}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.navigateToSignUp}
            style={styles.signupButton}>
            <Text style={styles.emailText}>REGISTER WITH EMAIL</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default withNavigation(Login);