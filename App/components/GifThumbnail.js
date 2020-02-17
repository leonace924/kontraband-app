import React, { PureComponent } from 'react';
import { withNavigation } from 'react-navigation';
import {View, Text, StyleSheet,} from "react-native";
import {Image} from "react-native-expo-image-cache";

class GifThumbnail extends PureComponent {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View style={styles.imageContainer}>
        <Image
          uri={this.props.uri}
          style={{
            width: this.props.width,
            height: this.props.height
          }}
        />
        <View style={styles.gifLoadingContainer}>
          <View style={styles.gifLoadingBackground}>
            <Text style={styles.gifLoadingButton}>GIF</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
  },
  gifLoadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gifLoadingBackground: {
    backgroundColor: '#c4201b',
    borderRadius: 30,
  },
  gifLoadingButton: {
    height: 60,
    width: 60,
    lineHeight: 60,
    textAlign: 'center',
    overflow: 'hidden',
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default withNavigation(GifThumbnail)