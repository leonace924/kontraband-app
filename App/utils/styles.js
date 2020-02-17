import { StyleSheet } from "react-native";

export const themes = {
  lightTheme: { mainColor: "#ffffff", color: '#191313', bgColor: '#f7f7f7' },
  darkTheme: { bgColor: '#1f1f1f', color: "#ffffff", mainColor: '#000000' }
};

export default CommonStyles = StyleSheet.create({
  container: {
    flex: 1
  },
  light__container: {
    flex: 1,
    backgroundColor : themes.lightTheme.mainColor
  },
  dark__container: {
    flex: 1,
    backgroundColor : themes.darkTheme.mainColor
  },
  containerKeyboard: {
    flex: 1
  },
  light__txt: {
    color: themes.lightTheme.color
  },
  dark__txt: {
    color: themes.darkTheme.color
  },
  flexOneRowStart: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  flexOneRowCenter: {
    flex: 0.8,
    flexDirection: 'row',
    paddingLeft: 12
  },
  flexOneRowEnd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  titleTxt: {
    textTransform: "uppercase",
    fontWeight: 'bold',
    fontSize: 24,
    marginVertical: 10
  },
  centerTxt: {
    textAlign: 'center'
  },
  textTransformNone: {
    textTransform: 'none'
  },
  alignItemsCenter : {
    alignItems: 'center'
  },
  flex1 : {
    flex : 1
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  elementAtEnd: {
    alignSelf: 'flex-end'
  },
  elementCenter: {
    alignItems: 'center'
  }
});
