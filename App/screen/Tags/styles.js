import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  headerMain: {
    flex: 1,
    marginBottom: 5
  },
  crossImageView: {
    height: 20,
    width: 20,
  },
  logInText: {
    // fontFamily: "Poppins",
    fontSize: 19,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 29,
    color: "#191313",
    textAlign: 'center'
  },
  headerImageView: {
    height: height * 0.3,
    width: width,
    backgroundColor: "#c4211c",
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchFieldView: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#cecece',
    marginTop: 20,
    paddingStart: 10,
    paddingEnd: 10
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.10,
  },
  youFollowText: {
    // fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    color: "#262424"
  },
  imageUri: {
    flex: 1,
    flexDirection: 'column',
    margin: 1
  },
  separatorView: {
    height: 1,
    width: width * 0.9,
    backgroundColor: "#cecece"
  },
  mainContainrView: { flex: 2, },
  bottom: {
    height: 32,
    backgroundColor: 'rgb(196, 33, 28)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: '#fff',
  },
  listPopular: {
    flex: 1
  },
  item: {
    width: '44%',
    margin: '3%',
    borderColor: '#191313',
    borderWidth: 1,
    borderRadius: 3
  },
});

export default styles;