import React, {PureComponent} from "react";
import {StyleSheet, Dimensions, View, Text, TouchableHighlight} from "react-native";
import {Video} from 'expo-av';

class GifOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  show = () => {
    this.setState({show: true});
  }

  hide = () => {
    this.setState({show: false});
  }

  handlePress = () => {
    this.setState(preState => ({show: !preState.show}), () => {
      this.state.show ? this.props.pause() : this.props.play();
    });
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={this.handlePress}
        style={
          this.state.show ?
            [styles.overlay, {height: this.props.height}] :
            [styles.overlayTransparent, {height: this.props.height}]}
      >
        <View style={this.state.show ? styles.border : styles.borderTransparent}>
          <Text style={this.state.show ? styles.txt : styles.txtTransparent}>GIF</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class Gif extends PureComponent {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.overlayRef = React.createRef();
  }

  playVideo = () => {
    this.videoRef.current.playAsync();
  }

  pauseVideo = () => {
    this.videoRef.current.pauseAsync();
  }

  playAsync = () => {
    this.playVideo();
    this.overlayRef.current.hide();
  }

  pauseAsync = () => {
    this.pauseVideo();
    this.overlayRef.current.show();
  }

  render() {
    return (
      <View style={styles.videoContainer}>
        <GifOverlay
          show={!this.props.shouldPlay}
          ref={this.overlayRef}
          play={this.playVideo}
          pause={this.pauseVideo}
          height={this.props.height}
        />
        <Video
          source={{uri: this.props.uri}}
          ref={this.videoRef}
          rate={1.0}
          useNativeControls={false}
          isMuted={true}
          resizeMode="cover"
          shouldPlay={true}
          isLooping
          style={[styles.video, {height: this.props.height}]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
  },
  borderTransparent: {
    backgroundColor: 'transparent'
  },
  border: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#c4201b',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txt: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  txtTransparent: {
    color: 'transparent',
  },
  video: {
    width: Dimensions.get('screen').width,
  },
  videoplaceholder: {
    width: Dimensions.get('screen').width,
    position: 'absolute',
    top: 0,
    zIndex: 5
  },
  overlay: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: 'transparent',
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlayTransparent: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('screen').width,
    backgroundColor: 'transparent',
    zIndex: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoContainer: {
    width: Dimensions.get('screen').width,
    marginBottom: 5,
    backgroundColor: '#cccccc'
  }
});