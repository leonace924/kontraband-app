import React from "react";
import { ThemeContext } from "../context";
import { TouchableOpacity, Image, StyleSheet, AsyncStorage } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

export default class ThemeButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light'
    }
  }

  handleSwitchTheme = async () => {
    this.setState(preState => ({ theme: preState.theme === 'light' ? 'dark' : 'light' }));
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {
          ({ switchTheme }) => (
            <TouchableOpacity onPress={switchTheme}>
              <FontAwesome5 name="moon" size={22} color="#868686" />
            </TouchableOpacity>
          )
        }

      </ThemeContext.Consumer>
    )
  }
}


