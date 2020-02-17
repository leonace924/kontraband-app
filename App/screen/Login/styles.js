import { StyleSheet, Dimensions } from "react-native";
const { width } = Dimensions.get("screen");
const styles = StyleSheet.create({
  loginMainContainer: {
    flex: 1,
  },
  mainContainer: {
    flex : 1,
    paddingHorizontal: 30,
  },
  headerBar: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 60,
    alignItems : 'center',
    justifyContent: 'center',
  },
  logInText: {
    fontSize: 19,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 29,
    color: "#191313",
    textAlign: 'center',
    flex : 1
  },
  crossImage: {
    width: 60,
    height: 60,
  },
  googleImage: {
    width: width * 0.85,
    height: 75.5,
    backgroundColor: "#ea4335",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10,
  },
  fbImage: {
    width: width * 0.85,
    height: 75.5,
    backgroundColor: "#3b5998",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 2
  },
  separatorView: {
    width: 130,
    height: 1,
    backgroundColor: "#cecece",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 2
  },
  logInButton: {
    width: '100%',
    height: 38.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#c4211c",
    marginTop: 60,
  },
  loginText: {
    fontSize: 19,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 29,
    letterSpacing: 0,
    textAlign: "left",
    color: "#c4211c"
  },
  signupButton: {
    width: '100%',
    height: 38.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#c4211c",
    marginTop: 10,
  },
  emailText: {
    fontSize: 19,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 29,
    letterSpacing: 0,
    textAlign: "left",
    color: "#c4211c"
  },
  logInMainText: {
    paddingStart: 130
  },
  loginCrossImage: {
    height: 20,
    width: 20,
    marginStart: 100
  },
  mainSeparator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  separatorText: {
    fontSize: 12,
    paddingTop: 5
  },
  iconStyle: {
    width : 20, 
    height : 20, 
    marginEnd : 20
  },
  closeLoginButton: {
    padding: 20
  },
});

export default styles;