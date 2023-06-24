import { StyleSheet } from "react-native";

// Files
import colors from "../../assets/colors";
import Fonts from "../../assets/fonts";

const loginStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    innerContainer: {
        width: '100%',
        padding: 15,
    },
    heading: {
        color: colors.black,
        fontFamily: Fonts.Medium,
        fontSize: 24,
        fontWeight: '400',
        marginTop: 50
    },
    loginButton: {
        backgroundColor: colors.appPink,
        marginTop: 30
    },
    rowContainer: {
        width: '100%',
        marginTop: 30,
        padding: 8,
        flexDirection: 'row',
        alignItems:'center'
    },
    signInText: {
        fontSize: 16,
        fontFamily: Fonts.Medium,
        fontWeight: "400",
        color: colors.black
    },
    resetPasswordContainer: {
        marginHorizontal: 5
    },
    resetPasswordText: {
        fontSize: 16,
        fontFamily: Fonts.Roman,
        fontWeight: "700",
        color: colors.appPink
    }
})

export default loginStyles;