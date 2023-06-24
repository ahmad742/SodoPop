import { StyleSheet } from "react-native";
import colors from "../../assets/colors";
import Fonts from "../../assets/fonts";
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:colors.white
    },
    innerContainer: {
        flex: 1,
    },
    // innerContainer: {
    //     flex: 1,
    //     padding: 15
    // },
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
        marginTop:30
    },
    flexRowButton: {
        flexDirection: 'row',
        width: '70%',
        alignContent: 'center',
        justifyContent: 'space-between',
        marginTop: '5%',
        paddingHorizontal: '5%',
        alignSelf:'center',
    },
    button: {
        width: '70%',
        backgroundColor: colors.appPink,
        borderColor: colors.appPink,
    },
   cancelbutton: {
        width: '70%',
        backgroundColor: colors.white,
        borderColor: colors.appPink,
    },
    button2: {
        width: 53,
        backgroundColor: colors.white,
        borderColor: colors.appPink,
        justifyContent:'center',
        alignItems:'center'
    },
    labelStyle: {
        fontSize: 18,
        color: colors.white,
    },
    CancellabelStyle: {
        fontSize: 18,
        color: colors.appPink,
    },
    labelStyle2: {
        fontSize: 26,
        color: colors.appPink,
        fontWeight:'400'
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
    },

    userInfoView:{ 
        flexDirection: 'row', 
        width:'95%', 
        alignSelf:'center', 
        height:50, 
        alignItems:'center',
        paddingHorizontal:10
        },
        infoTxt:{
            fontSize:16,
            fontWeight:'400',
            marginLeft:10,
            color:colors.black, 
        },
        flatListContainer: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 5,
            paddingHorizontal:15
        },
        flatListInfoContainer: {
            // width: "70%",
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
        menuContainer: {
            width: 53,
            alignItems: 'center',
            justifyContent:'center',
            borderColor:colors.appPink,
            borderWidth:1
        },
        bottomsheetInnerContainer:{
            width:'90%',
            alignSelf:'center',
            // alignItems:'center',
            height:181,
            // backgroundColor:'red',
            borderRadius:10,
            padding:30,
            backgroundColor:colors.white,
            shadowColor: '#171717',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 30,
        }

})

export default styles;