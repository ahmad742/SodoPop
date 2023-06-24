// General Imports
import { StyleSheet } from "react-native";

// Files
import colors from "../../assets/colors";
import Fonts from "../../assets/fonts";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    innerContainer: {
        width: "100%",
        padding: 15,
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
    bottomRightCorner: {
        width: 238,
        height: 200,
        marginTop: 'auto',
        marginLeft: 'auto',
    },
    infoText: {
        color: colors.black,
        fontSize: 16,
        fontWeight: '400',
        fontFamily: Fonts.Roman,
        marginTop: 45,
        // marginLeft: 18
    },
    textInput:{
        marginVertical:18,
    },
    buttonContainer:{
        backgroundColor:colors.appPink,
        marginTop:20
    }
})

export default styles;