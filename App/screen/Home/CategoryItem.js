import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const navigateToTag = (props, tag) => {
  props.navigateToTag(tag)
}

const CategoryItem = props => {

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.itemView} onPress={() => navigateToTag(props, props.item.name)} >
        <Image
          style={styles.postImage}
          source={{ uri: props.item.preview.sizes.small }}
        />
        <View style={styles.bottom}>
          <Text style={styles.itemText}>#{props.item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal : 5
  },
  itemView: {
    height: 100,
    width: 170,
    borderRadius: 3,
    overflow: 'hidden'
  },
  itemText: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    textAlign: "center",
    color: "#fff",
    padding: 5
  },
  inputField: {
    height: hp("5.51224%"),
    fontSize: hp("1.7992%"),
    color: "black",
    textAlign: "center",
  },
  errorField: {
    height: hp("5.51224%"),
    fontSize: hp("1.7992%"),
    color: "#ff1a75",
    textAlign: "center",
  },
  crossImage: {
    width: '15%',
    height: '95%',
    resizeMode: 'contain',
  },
  postHeadingText: {
    // fontFamily: "Poppins",
    fontSize: 15,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "left",
    color: "#191313",
    paddingTop: '2%',
    marginTop: '4%',
    marginBottom: '4%',
    paddingEnd: '2%'
  },
  postImage: {
    width: '100%',
    height: '70%',
    resizeMode: 'cover',
  },
  hashTag: {
    // fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "normal",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    color: "#c4211c",
    paddingStart: '5%'
  },
  bottom: {
    height: 32,
    backgroundColor: 'rgb(196, 33, 28)'
  }
});

export default CategoryItem;