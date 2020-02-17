import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const InputField = props => {
  const I = props.I;
  return (
    <View style={styles.inputMainView}>
      <View style={styles.inputTextView}>
        {
          props.I !== undefined &&
          I
        }
        <TextInput
          value={props.name}
          style={[styles.inputField, props.styles]}
          underlineColorAndroid="transparent"
          placeholder={props.fieldName}
          placeholderTextColor="#cecece"
          autoCapitalize="none"
          secureTextEntry={props.textSecure}
          onChangeText={props._handleInput()}
        />
      </View>
      <View style={styles.separatorView} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputMainView: {
    flex: 1,
    marginTop: 20
  },
  inputField: {
    width: '80%',
    fontSize: hp("1.7992%"),
    color: "black",
    marginLeft : 10
  },
  crossImage: {
    width: 20,
    height: 20,
    marginEnd: 20
  },
  separatorView: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#cecece",
    marginTop: 5,
    width : '100%'
  },
  inputTextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
});

export default InputField;