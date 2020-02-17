import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Video } from 'expo-av';
import {Image} from "react-native-expo-image-cache";

export default class VideoCustom extends React.PureComponent
{
  constructor(props){
    super(props);
    this.videoRef = React.createRef();
    this.state = {
      viewable : false
    }
  }

  playVideo = () => {
    this.videoRef.current.playAsync();
  }

  handleWhenReadyPlayVideo = () => {
    this.setState({
      viewable : true
    });
  }

  componentDidMount() {
    this.playVideo()
  }

  render(){
    const {item} = this.props;

    return(
      <View style={styles.videoContainer}>
        {
          !this.state.viewable && 
          <Image style={[styles.videoplaceholder, {height : this.props.height}]} uri={item.sizes.small}/>
        }
        <Video
          onReadyForDisplay={this.handleWhenReadyPlayVideo}
          downloadFirst={false}
          source={{ uri: item.file }}
          ref={this.videoRef}
          rate={1.0}
          volume={0.5}
          useNativeControls={item.post_type == 'video'}
          isMuted={false}
          resizeMode="cover"
          shouldPlay={true}
          isLooping
          style={[styles.video, {height : this.props.height}]}
        />
      </View>
    )
    
  }
}

const styles = StyleSheet.create({
  videoplaceholder : {
    width: Dimensions.get('screen').width,
    position : 'absolute',
    top : 0,
    zIndex : 5
  },
  videoContainer : {
    width: Dimensions.get('screen').width,
    marginBottom: 5,
    backgroundColor : '#cccccc'
  },
  video : {
    width: Dimensions.get('screen').width,
    height: 350,
  }
});

