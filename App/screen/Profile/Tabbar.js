import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';

const Tabbar = props => {
  return (
    <View style={styles.tabbarMainView}>
      <View style={styles.tabView}>
        <TouchableOpacity style={styles.tabItem} onPress={() => props.changeTab((type = 0))}>
          <View style={styles.profileCircleIcon}>
            <FontAwesome5 name='user-ninja' size={40} color="#c4211c" />
          </View>
          <Text style={styles.tabText}>Profile</Text>
          <View style={[styles.sepratorMainView, { backgroundColor: props.profile ? '#000000' : '#cccccc', height: props.profile ? 2 : 1 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => props.changeTab((type = 1))}>
          <View style={styles.profileCircleIcon}>
            <FontAwesome name='star' size={40} color="#c4211c" />
          </View>
          <Text style={styles.tabText}>Tags</Text>
          <View style={[styles.sepratorMainView, { backgroundColor: props.tags ? '#000000' : '#cccccc', height: props.tags ? 2 : 1 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => props.changeTab((type = 2))}>
          <View style={styles.profileCircleIcon}>
            <FontAwesome name='thumbs-up' size={40} color="#c4211c" />
          </View>
          <Text style={styles.tabText}>Votes</Text>
          <View style={[styles.sepratorMainView, { backgroundColor: props.posts ? '#000000' : '#cccccc', height: props.posts ? 2 : 1 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => props.changeTab((type = 3))}>
          <View style={styles.profileCircleIcon}>
            <FontAwesome name='cog' size={40} color="#c4211c" />
          </View>
          <Text style={styles.tabText}>Settings</Text>
          <View style={[styles.sepratorMainView, { backgroundColor: props.more ? '#000000' : '#cccccc', height: props.more ? 2 : 1 }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tabbar;