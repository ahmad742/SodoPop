import { StyleSheet } from "react-native";

// Files
import Fonts from "../../assets/fonts";
import colors from "../../assets/colors";

const friendStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        padding: 15
    },
    requestRowContainer: {
        width: "100%",
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center"
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    requestRightContainer: {
        width: "60%",
        marginLeft: 15
    },
    requestHeadingText: {
        fontFamily: Fonts.Medium,
        fontWeight: "400",
        color: colors.black,
        fontSize: 18
    },
    requestSubheadingText: {
        fontSize: 14,
        fontFamily: Fonts.Roman,
        fontWeight: "400",
        color: colors.placeholderColor
    },
    flatListHeading: {
        fontSize: 24,
        fontFamily: Fonts.Roman,
        fontWeight: "400",
        color: colors.black,
        marginVertical: 10,
    },
    flatListContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
    },
    flatListInfoContainer: {
        width: "70%",
        flexDirection: "row",
        alignItems: "center"
    },
    friendNameText: {
        fontSize: 18,
        fontFamily: Fonts.Roman,
        color: colors.black,
        marginHorizontal: 10
    },
    menuButton: {
        width: "30%",
        alignItems: "flex-end"
    },
    bottomsheetInnerContainer:{
        width:'90%',
        alignSelf:'center',
        // alignItems:'center',
        height:181,
        // backgroundColor:'lightgrey',
        borderRadius:10,
        padding:30,
        backgroundColor:colors.white,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 30,
    }
})

export default friendStyles;