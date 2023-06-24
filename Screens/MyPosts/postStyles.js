import { StyleSheet } from "react-native";

// Files
import colors from "../../assets/colors";
const postStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    innerContainer: {
        flex:1
    },
    roundButtonContainer:{
        top:"90%",
        right:30,
        bottom:30
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

export default postStyles;