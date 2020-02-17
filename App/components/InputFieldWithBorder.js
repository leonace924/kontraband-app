import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { ThemeContext } from "../context";
import { themes } from "../utils/styles";

const InputFieldWithBorder = props => {
  return (
    <ThemeContext.Consumer>
      {
        ({ theme }) => (
          <View style={styles.inputMainView}>
            <View style={styles.inputTextView}>
              <Text style={[[styles[`${theme}__label`], props.labeStyles]]}>{props.label}</Text>
              <TextInput
                value={props.name}
                style={[styles.inputField, props.styles]}
                underlineColorAndroid="transparent"
                placeholder={props.fieldName}
                placeholderTextColor="#cecece"
                autoCapitalize="none"
                secureTextEntry={props.textSecure}
                multiline={props.multiline}
                numberOfLines={props.numberOfLines}
                onChangeText={(text) => props._handleInput(text)}
              />
            </View>
          </View>
        )
      }
    </ThemeContext.Consumer>
  );
};

const styles = StyleSheet.create({
  light__label : {
    fontWeight : 'bold',
    marginVertical : 8,
    color : themes.lightTheme.color
  }, 
  dark__label : {
    fontWeight : 'bold',
    marginVertical : 8,
    color : themes.darkTheme.color
  }, 
  inputMainView: {
    flex: 1,
    marginTop: 20
  },
  inputField: {
    backgroundColor : themes.lightTheme.bgColor,
    textAlignVertical: "top",
    width: '100%',
    fontSize: hp("1.7992%"),
    color: "black",
    textAlign: "left",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#c4201b', 
    padding : 6
  },
  inputTextView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
});

export default InputFieldWithBorder;