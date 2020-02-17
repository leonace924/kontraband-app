import { StyleSheet } from "react-native";
import { themes } from "../../utils/styles";

const styles = StyleSheet.create({
  postIcon : {
    position: 'absolute',
    left: '80%'
  },
  safeAreaView: {
    flex: 1
  },
  light__mainContainer: {
    flex: 1,
    backgroundColor: themes.lightTheme.bgColor,
  },
  dark__mainContainer: {
    flex: 1,
    backgroundColor: themes.darkTheme.bgColor,
  },
  mainPostContainer: {
    flex: 1
  },
  light__itemContainer: {
    flex: 1,
    backgroundColor: themes.lightTheme.mainColor,
    marginTop: 10,
    marginBottom: 10,
  },
  dark__itemContainer: {
    flex: 1,
    backgroundColor: themes.darkTheme.mainColor,
    marginTop: 10,
    marginBottom: 10,
  },
  itemListContainer: {
    marginTop: 25,
    flex: 1,
    backgroundColor: themes.lightTheme.bgColor
  },
  dark__contentContainer: {
    marginTop: 25,
    flex: 1,
    backgroundColor: themes.darkTheme.bgColor
  },
  light__contentContainer: {
    marginTop: 25,
    flex: 1,
    backgroundColor: themes.lightTheme.bgColor
  },
  dark__itemListContainerHeader: {
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 15,
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0,
    color: themes.lightTheme.mainColor
  },
  light__itemListContainerHeader: {
    marginTop: 5,
    marginBottom: 5,
    paddingHorizontal: 15,
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0,
    color: themes.darkTheme.mainColor
  },
  light__item: {
    height: 20,
    backgroundColor: themes.lightTheme.bgColor
  },
  dark__item: {
    height: 20,
    backgroundColor: themes.darkTheme.bgColor
  },
  headerView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems : 'flex-end',
    marginVertical : 15,
    paddingHorizontal : 15,
    // paddingStart: 10,
  },
  bottomBarView: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ebedee',
    marginTop: 10
  },
  bottomImageViews: {
    width: 40,
    height: 40,
    backgroundColor: '#b9f8bc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1,
  },
  vote: {
    width: 40,
    height: 40,
    backgroundColor: '#dbdbdb',
    alignItems: 'center',
    paddingTop: 5,
    marginRight: 8
  },
  imageView: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  crossImage: {
    width: '15%',
    height: '80%',
    resizeMode: 'contain',
  },
  light__postHeadingText: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0,
    color: themes.lightTheme.color,
    position : 'relative',
    top : 3
  },
  dark__postHeadingText: {
    fontSize: 15,
    fontWeight: "bold",
    letterSpacing: 0,
    color: themes.darkTheme.color,
    position : 'relative',
    top : 3
  },
  light__countText: {
    //fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    color: themes.lightTheme.color,
    paddingEnd: '35%'
  },
  dark__countText: {
    //fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "normal",
    lineHeight: 21,
    letterSpacing: 0,
    textAlign: "left",
    color: themes.darkTheme.color,
    paddingEnd: '35%'
  },
  postImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    marginBottom: 5
  },
  bottomImageFb: {
    backgroundColor: "#3b5998",
  },
  bottomImageTw: {
    backgroundColor: "#1da1f2",
  },
  bottomImageDots: {
    backgroundColor: "#dbdbdb",
  },
  drowdownList: {
    position: 'absolute',
    top: 40
  },
  listTag: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tagItem: {
    paddingRight: 16,
    color: '#c4211c',
    fontSize: 16,
    margin: 4
  },
  btnSocialArea : {
    width : 40,
    height : 40,
    marginRight : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#dbdbdb'
  }
});

export default styles;