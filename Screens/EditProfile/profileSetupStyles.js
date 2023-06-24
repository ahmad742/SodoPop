import { StyleSheet } from "react-native";
import colors from "../../assets/colors";
import Fonts from "../../assets/fonts";
const profileSetupStyles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    coverImage: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
    innerContainer: {
        flex: 1
    },
    ccam: {
        width: 35,
        height: 35,
        backgroundColor: colors.appPink,
        position: 'absolute',
        right: 0,
        marginTop: 10,
        marginRight: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        alignSelf: 'center',
        width: 130,
        height: 100,
        alignItems: 'center',
        marginTop: -50
    },
    pcam: {
        width: 30,
        height: 30,
        backgroundColor: colors.appPink,
        position: 'absolute',
        right: 0,
        bottom: 0,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10
    },
    TextHeading: {
        textAlign: 'center',
        color: 'black',
        fontFamily: Fonts.Roman,
        fontWeight: '400',
        fontSize: 24
    },
    TextGray: {

        color: colors.LightGray
    },
    TextPara: {
        textAlign: 'center',
        paddingHorizontal: 43,
        fontSize: 16,
        fontFamily: Fonts.Roman,
        fontStyle: 'normal'
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
        marginTop: 50,
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
    editText: {
        marginTop: 20,

    }
    ,
    inputConatiner: {
        multiline: true,

    },
    privacyContainer: {
        marginTop: 30,
    },
    checkText: {
        fontSize: 16,
        fontFamily: Fonts.Roman
    },
    active: {
        backgroundColor: colors.appPink,
        borderWidth: 0,
    },
    interestTags: {
        color: colors.white,
    },
    interestContainer: {
        backgroundColor: colors.appPink,
        margin: 10,
        borderRadius: 20,
        padding: 15,
        flexDirection:'row',
        // width:'40%',
    }
})

export default profileSetupStyles;