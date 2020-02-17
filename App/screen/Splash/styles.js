import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c4201b'
  },
  logoImage: {
    width: wp("80.51224%"),
    height: hp("40.51224%"),
    resizeMode: "contain",
  },
});

export default styles;