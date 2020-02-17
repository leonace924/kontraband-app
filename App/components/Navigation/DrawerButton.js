import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';

class DrawerButton extends React.Component {

  constructor(props) {
    super(props);
  }

  toggle = () => {
    this.props.navigation.toggleDrawer()
  }

  render() {
    return (
      <TouchableOpacity onPress={this.toggle} >
        <View style={styles.wrap}>
          <SimpleLineIcons name='menu' size={24} style={styles.iconStyle} />
        </View>
      </TouchableOpacity>
    )
  }
};

const styles = StyleSheet.create({
  wrap : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  iconStyle: {
    color: 'white',
    paddingLeft: 14,
    paddingRight: 14
  }
})

export default withNavigation(DrawerButton);
