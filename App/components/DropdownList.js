import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';


export default function DropdownList({ report = true , ...props}) {

  const _handleSelect = value => {
    switch (value) {
      case 1:

        break;
      case 2:

        break;
      case 3:
        props.onPressReport(props.slug);
        break;
    }
  }

  return (
    <Menu onSelect={_handleSelect}>
      <MenuTrigger>
        <View style={[styles.button, props.btnStyles]}>
          <FontAwesome5 name="ellipsis-h" size={20} color={'#ffffff'} />
        </View>
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={styles.listContainer}>
        <MenuOption value={1} style={styles.itemDropdown}>
          <Text style={styles.itemDropdownTxt}>Whatsapp</Text>
        </MenuOption>
        <MenuOption value={2} style={styles.itemDropdown}>
          <Text style={styles.itemDropdownTxt}>Pinterest</Text>
        </MenuOption>
        {
          report && 
          <MenuOption value={3} style={styles.itemDropdown}>
            <Text style={styles.itemDropdownTxt}>Report</Text>
          </MenuOption>
        }
        
      </MenuOptions>
    </Menu>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    maxWidth: 90,
    top: 40,
    position: 'relative'
  },
  itemDropdown: {
    backgroundColor: '#dbdbdb',
    borderBottomColor: 'rgba(0,0,0,.16)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    maxWidth: 90
  },
  itemDropdownTxt: {
    color: '#c4201b',
    fontSize: 13
  },
  container: {
    zIndex: 99
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    backgroundColor: "#dbdbdb"
  },
  drowdownList: {
    position: 'absolute',
    top: 40,
    zIndex: 99
  },
  imageView: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain'
  }
});