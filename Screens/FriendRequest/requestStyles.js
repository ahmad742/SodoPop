import { StyleSheet } from "react-native";

// Files
import Fonts from "../../assets/fonts";
import colors from "../../assets/colors";

const requestStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        padding: 15
    },
    buttonAccept: {
        width:50,
        height:30,
        backgroundColor: colors.appPink,
        borderColor: colors.appPink,
    },
    buttonIgnore: {
        width:50,
        height:30,
        backgroundColor: colors.white,
        borderColor: colors.appPink,
        marginLeft:10
    },
    labelStylea: {
        fontSize: 12,
        color: colors.white,
    },
    labelStyle: {
        fontSize: 12,
        color: colors.appPink,
    },
    flatListContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    flatListInfoContainer: {
        width: "60%",
        flexDirection: "row",
        alignItems: "center"
    },
    friendNameText: {
        fontSize: 18,
        fontFamily: Fonts.Roman,
        color: colors.black,
        marginHorizontal: 10
    },

})

export default requestStyles;