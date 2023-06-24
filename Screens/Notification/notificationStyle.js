import { StyleSheet } from "react-native";
import colors from "../../assets/colors";
import Fonts from "../../assets/fonts";
const notificationStyle = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    title: {
        color: colors.black,
        fontSize: 16,
        width:'100%'
    },
    description: {
        color: colors.LightGray,
        fontSize: 12
    },
    innerContainer:{
        padding: 5,
        //  marginTop: 20
    },
    flatView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: '7%'
    },
    flatImage: {
        width: '20%',
        height: 50,
        resizeMode: 'center'
    },
    buttonAccept: {
        width:50,
        height:30,
        backgroundColor: colors.appPink,
        borderColor: colors.appPink,
    },buttonIgnore: {
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
})

export default notificationStyle;