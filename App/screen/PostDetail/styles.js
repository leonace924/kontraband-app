import { StyleSheet, PixelRatio } from "react-native";
import { themes } from "../../utils/styles";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  light__contentContainer: {
    backgroundColor: themes.lightTheme.bgColor
  },
  dark__contentContainer: {
    backgroundColor: themes.darkTheme.bgColor
  },
  PostDetailContainer: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  postIcon: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#c4201b',
    position: 'absolute',
    left: '80%',
    overflow: 'hidden'
  },
  postIconImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingStart: '5%',
    paddingEnd: '5%',
    marginBottom: 12
  },
  bottomBarView: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginTop: 5,
    justifyContent : 'space-between'
  },
  imageView: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  crossImage: {
    width: '15%',
    height: '80%',
    resizeMode: 'contain',
  },
  light__postHeadingText: {
    // fontFamily: "Poppins",
    fontSize: 17,
    fontWeight: "bold",
    color: themes.lightTheme.color,
    textAlign: 'center'
  },
  dark__postHeadingText: {
    // fontFamily: "Poppins",
    fontSize: 17,
    fontWeight: "bold",
    color: themes.darkTheme.color,
    textAlign: 'center'
  },
  light__pointTxt: {
    color: themes.lightTheme.color,
    textAlign: 'center'
  },
  dark__pointTxt: {
    color: themes.darkTheme.color,
    textAlign: 'center'
  },
  light__countText: {
    //fontFamily: "Poppins",
    flex: 1,
    fontSize: 9.5 * PixelRatio.get(),
    fontWeight: "bold",
    letterSpacing: 0,
    textAlign: "center",
    color: themes.lightTheme.color,
  },
  dark__countText: {
    //fontFamily: "Poppins",
    flex: 1,
    fontSize: 9.5 * PixelRatio.get(),
    fontWeight: "bold",
    letterSpacing: 0,
    textAlign: "center",
    color: themes.darkTheme.color,
  },
  postImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    marginBottom: 5
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
    paddingStart: '5%',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 16,
    marginBottom: 24
  },
  light__title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: themes.lightTheme.color,
    marginLeft: 12,
    marginTop: 16,
    marginBottom: 24
  },
  dark__title: {
    fontSize: 22,
    color: themes.darkTheme.color,
    fontWeight: 'bold',
    marginLeft: 12,
    marginTop: 16,
    marginBottom: 24
  },
  buttonDots: {
    backgroundColor: "#dbdbdb",
    flex: 1,
    height: 45,
    width: 45
  },
  light__viewSpace: {
    height: 20,
    backgroundColor: themes.lightTheme.bgColor
  },
  dark__viewSpace: {
    height: 20,
    backgroundColor: themes.darkTheme.bgColor
  },
  headerLeft: {
    flex: 1
  },
  headerCenter: {
    flex: 4
  },
  headerRight: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  pointArea: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: 8
  },
  pointAreaLeft: {
    flex: 1.5
  },
  pointAreaRight:
  {
    flex: 1
  },
  icPoint: {
    width: 48,
    height: 48
  },
  shareArea: {
    flexDirection: 'row',
    marginTop: 6,
    paddingHorizontal: 15
  },
  btnSocialArea: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 45,
    marginRight: 1,
    backgroundColor: '#dbdbdb'
  },
  fb: {
    backgroundColor: "#3b5998",
    flex: 2,
    height: 48
  },
  tw: {
    backgroundColor: "#1da1f2",
    flex: 2,
    height: 48
  },
  bottomImageViews: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#dbdbdb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryList: {
    marginTop: 12,
    marginBottom: 12
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
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 5,
    paddingHorizontal: 10,
  }
});

export default styles;