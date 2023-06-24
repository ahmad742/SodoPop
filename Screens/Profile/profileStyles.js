import { StyleSheet } from "react-native";
import colors from "../../assets/colors";
import Fonts from "../../assets/fonts";
const profileStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
    },
    coverImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    profileImage: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        marginTop: -50
    },
    TextHeading: {
        textAlign: 'center',
        color: 'black',
        fontFamily: Fonts.Roman,
        fontWeight: '400',
        fontSize: 24
    },
    TextGray: {
        textAlign: "center",
        color: colors.LightGray
    },
    profileDescription: {
        textAlign: 'center',
        paddingHorizontal: 43,
        fontSize: 16,
        fontFamily: Fonts.Roman,
        color: colors.black,
        lineHeight:23.33,
        marginTop:15
        
    },
    flexRowButton: {
        flexDirection: 'row',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginTop: '5%',
        paddingHorizontal: '5%'
    },
    button: {
        width: '48%',
        backgroundColor: colors.appPink,
        borderColor: colors.appPink,
    },
    labelStyle: {
        fontSize: 16,
        color: colors.white,
    },
    row: {
        flex: 1,
        justifyContent: "flex-start"
    },
    interestTags: {
        color: colors.white
    },
    interestContainer: {
        backgroundColor: colors.appPink,
        margin: 10,
        borderRadius: 20,
        padding: 10
    }

})

export default profileStyles;