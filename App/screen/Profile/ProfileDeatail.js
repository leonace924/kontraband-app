import React from "react";
import { Text, View } from "react-native";

import moment from 'moment';
import styles from './styles';

const ProfileDeatail = props => {
  return (
    <View style={styles.ProfileDeatailView}>
      <View>
        <Text style={styles.tittleText}>Email Address</Text>
        <Text style={styles.dataText}>{props.userDetail.email}</Text>
      </View>
      <View>
        <Text style={styles.tittleText}>Uploaded Posts</Text>
        <Text style={styles.dataText}>0 posts</Text>
      </View>
      <View>
        <Text style={styles.tittleText}>Liked posts</Text>
        <Text style={styles.dataText}>{props.userDetail.likes}</Text>
      </View>
      <View>
        <Text style={styles.tittleText}>Liked Tags</Text>
        <Text style={styles.dataText}>{props.followingTagsCount.total_count}</Text>
      </View>
      <View>
        <Text style={styles.tittleText}>Member Since</Text>
        <Text style={styles.dataText}>{moment(props.userDetail.created_at).format('DD/MM/YYYY')}</Text>
      </View>
    </View>
  );
};


export default ProfileDeatail;