import { StyleSheet } from "react-native";

// Files
import colors from "../../assets/colors";
import Fonts from "../../assets/fonts";

const VerificationStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    innerContainer: {
        width: "100%",
        // padding: 15,
        alignSelf: 'center',
    },
    roundContainer: {
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    infoText: {
        color: colors.black,
        fontSize: 16,
        fontWeight: '400',
        fontFamily: Fonts.Roman,
        marginTop: 45,
        marginLeft: 18
    },
    buttonStyle: {
        backgroundColor: colors.appPink,
        marginTop: 30,
        width: "93%",
        alignSelf: 'center'
    },
    rowContainer: {
        width: '100%',
        marginTop: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    receiveCodeText: {
        fontSize: 16,
        fontFamily: Fonts.Roman,
        fontWeight: "400",
        color: colors.placeholderColor,
        marginLeft: 15
    },
    resendTextContainer: {
        marginHorizontal: 5
    },
    resendText: {
        fontSize: 16,
        fontFamily: Fonts.Roman,
        fontWeight: "700",
        color: colors.appPink
    },
    bottomRightCorner: {
        width: 238,
        height: 200,
        marginTop: 'auto',
        marginLeft: 'auto',
    }
})

export default VerificationStyles;