import { StyleSheet } from "react-native";

// Files
import colors from "../../assets/colors";

const createPollStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    innerContainer: {
        width: "100%",
        padding: 10,
        alignItems:"center",
        // backgroundColor:'red'
    },
    rowContainer: {
        width: "100%",
        justifyContent: "center",
        flexDirection: "row"
    },
    postButton: {
        backgroundColor: colors.appPink,
        marginTop:50
    }
})

export default createPollStyles;