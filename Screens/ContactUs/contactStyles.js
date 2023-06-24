import { StyleSheet } from "react-native";
import Fonts from "../../assets/fonts";
import colors from "../../assets/colors";
const contactStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    appLogo: {
        width: 180,
        height: 150,
        alignSelf: 'center',
        resizeMode: 'center',
    },
    smain: {
        padding: 15,
        flex: 1,
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
        fontFamily: Fonts.Roman,
        color: colors.black,
        fontWeight:"300",
        lineHeight:25,
    },
    editText: {
        marginTop: 20,
        height: 170,
        borderWidth: 0,
        borderRadius: 10,
        borderColor: colors.placeholderColor,

    },
    textinput: {
        textAlignVertical: 'top'
    },
    inputInnerContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.placeholderColor,
        height: '90%'
    },
    button: {
        marginTop: 'auto',
        marginBottom: 30,
        backgroundColor: colors.appPink,
        borderColor: colors.appPink,
    },
    labelStyle: {
        fontSize: 16,
        color: colors.white,
    },
})

export default contactStyles;