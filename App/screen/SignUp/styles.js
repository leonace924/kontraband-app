import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  signUpMainView: {
    flex: 1,
    padding: 30
  },
  signIndexView: {
    flex: 1
  },
  signUpBodyView: {
    height: '40%'
  },
  headerBar: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 60,
    justifyContent : 'center',
    alignItems : 'center'
  },
  logInText: {
    fontSize: 19,
    fontWeight: "bold",
    flex : 1,
    fontStyle: "normal",
    lineHeight: 29,
    color: "#191313",
    textAlign: 'center'
  },
  crossImageView: {
    height: 20,
    width: 20,
    marginStart: 100
  },
  crossImage: {
    width: 60,
    height: 60,
  },
  buttonView: {
    width: '100%',
    height: 38.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#c4211c",
    marginTop: 80,
  },
  signupText: {
    fontSize: 19,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 29,
    letterSpacing: 0,
    textAlign: "left",
    color: "#c4211c"
  }
});

export default styles;