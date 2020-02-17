import React, { useState } from "react";
import {View, StyleSheet, ScrollView, Text, SafeAreaView} from "react-native";

import { ThemeContext } from "../../context";
import CommonStyles, { themes } from "../../utils/styles";
import { TouchableOpacity } from "react-native";
import InputFieldWithBorder from "../../components/InputFieldWithBorder";
import { apiFetchPost } from "../../utils/network";
import { constants } from "../../constants";

export default function Report(props) {

  const [ email, setEmail ] = useState('');
  const [ msg, setMsg ] = useState('');

  const handleSubmit = async () => {
    if(!email.length || !msg.length){
      alert('Email or Message is required');
      return;
    }

    const resp = await apiFetchPost(`report?token=${constants.token}`, { email, slug : props.navigation.getParam('slug', 'xxx'), message: msg });
    const res = await resp.json();
    setEmail('');
    setMsg('');

    if(res.status === 'ok')
      alert('Success');
  }

  return (
    <ThemeContext.Consumer>
      {
        ({ theme }) => (
          <SafeAreaView style={CommonStyles[`${theme}__container`]}>
            <ScrollView style={styles[`${theme}__container`]}>
              <View style={styles.titleContainer}>
                <Text style={[styles.title, CommonStyles[`${theme}__txt`]]}>report post!</Text>
                <Text style={[styles.link, CommonStyles[`${theme}__txt`]]}>{`www.kontraband.com/post/${props.navigation.getParam('slug', 'xxx')}`}</Text>
              </View>
              <View style={styles.formContainer}>
                <InputFieldWithBorder 
                  name={email}
                  label={'E-Mail-Address*'} 
                  _handleInput={email => setEmail(email)}
                  styles={styles.input} 
                  labeStyles={styles.labeStyles} />
                {/* <InputFieldWithBorder label={'Subject*'} styles={styles.input} labeStyles={styles.labeStyles} /> */}
                <InputFieldWithBorder 
                  name={msg}
                  label={'Message*'} 
                  _handleInput={msg => setMsg(msg)}
                  styles={styles.input} multiline numberOfLines={5} 
                  labeStyles={styles.labeStyles} />
              </View>
              <View style={styles.actionContainer}>
                <TouchableOpacity style={styles.btnSend} onPress={handleSubmit}>
                  <Text style={styles.txtSend}>send</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        )
      }
    </ThemeContext.Consumer>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  actionContainer: {
    justifyContent: 'flex-end',
    marginTop: 10
  },
  txtSend: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#c4201b',
    color: '#fff',
    textTransform: 'uppercase'
  },
  labeStyles: {
    fontWeight: 'normal',
    fontSize: 10
  },
  input: {
    borderColor: '#cccccc'
  },
  mainContainer: {
    flex: 1
  },
  light__container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: themes.lightTheme.bgColor
  },
  dark__container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: themes.darkTheme.bgColor
  },
  titleContainer: {

  },
  title: {
    textTransform: "uppercase",
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 10
  },
  link: {
    textTransform: "uppercase",
    fontWeight: '200',
    fontSize: 10
  },
  btnSend: {
    alignSelf: 'flex-end'
  }
});