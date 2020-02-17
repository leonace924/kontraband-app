import { Dimensions, StyleSheet, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
  },
  headerMain: {
    // flex: 1,
  },
  headerView: {
    height: height * 0.09,
    width: width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#c4201b",
    paddingTop: 5
  },
  scrollViewContainer: {
    flex: 1,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  drawerImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginTop: '2%'
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
  crossImage: {
    width: 60,
    height: 60,
  },
  headerImageView: {
    height: height * 0.3,
    width: width,
    backgroundColor: "#c4211c",
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    backgroundColor: "#dbdbdb",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#c4211c"
  },
  imageUpload: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    // fontFamily: "Poppins",
    fontSize: 19,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 29,
    letterSpacing: 0,
    textAlign: "left",
    color: "#ffffff"
  },
  tabbarMainView: {
    marginStart: 10,
    marginEnd: 10,
    marginTop: 20
  },
  tabView: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row'
  },
  tabImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  },
  separatorView: {
    width: '100%',
    marginTop: 10,
    marginEnd: 20
  },
  profileCircleIcon: {
    width: 65,
    height: 65,
    borderWidth: 2,
    borderColor: '#c4201b',
    borderRadius: 50,
    paddingTop: 10,
    alignItems: 'center'
  },
  ProfileDeatailView: {
    flex: 1,
    paddingHorizontal: 28,
    paddingBottom: 30
  },
  settingFormView: {
    flex: 1,
    paddingHorizontal: 28,
    marginBottom: 10
  },
  changeButtonView: {
    width: width * 0.8,
    height: height * 0.05,
    backgroundColor: "#c4211c",
    marginTop: 10,
    marginBottom: 10
  },
  changeText: {
    // fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 25,
    letterSpacing: 0,
    textAlign: "center",
    color: "#ffffff"
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 29,
    textAlign: "center",
    color: "#191313"
  },
  headerWrapper: {
    paddingTop: 10,
    paddingBottom: 10
  },
  tittleText: {
    // fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    color: "#191313",
    paddingTop: 5,
    paddingBottom: 8
  },
  tabText: {
    //  fontFamily: "Poppins",
    fontSize: 6 * PixelRatio.get(),
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 29,
    letterSpacing: 0,
    textAlign: "left",
    color: "#191313"
  },
  sepratorMainView: {
    width: width * 0.18,
  },
  btnText: {
    color: "#ffffff",
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonView: {
    height: 38.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    backgroundColor: "#c4211c",
  },
  buttonView_marginTop: {
    marginVertical: 9,
    width: '100%'
  },
  settingFormView__btnContainer: {
    flexDirection: 'row',
    marginTop: 18,
    paddingBottom: 18,
    justifyContent: 'space-between'
  },
  btnViewModife: {
    width: '45%'
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 10
  },
  profileTxt: {
    paddingStart: 130
  },
  btnBack: {
    height: 20,
    width: 20,
    marginStart: 140
  },
  tack: {
    width: 80,
    height: 92,
    resizeMode: 'contain'
  },
  cameraImage: {
    height: 20,
    width: 20
  },
  logo: {
    width: '60%',
    height: '70%'
  }
});

export default styles;