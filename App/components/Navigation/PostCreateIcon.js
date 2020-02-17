import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';


class PostCreateIcon extends React.Component {
  render() {
    const navigateToPostCreate = () => {
      this.props.navigation.navigate('PostCreate')
    }

    return (
      <TouchableWithoutFeedback onPress={navigateToPostCreate}>
        <AntDesign name='plus' size={24} color="#fff" style={styles.plus} />
      </TouchableWithoutFeedback>
    );
  }
}

export default withNavigation(PostCreateIcon)

const styles = StyleSheet.create({
  plus: {
    marginRight: 15
  }
});