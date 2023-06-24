import { StyleSheet } from 'react-native'
import colors from '../../assets/colors'
import Fonts from '../../assets/fonts';

const homeStyles = StyleSheet.create({
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
        backgroundColor:'red',
        borderRadius:10,
        padding:30,
        backgroundColor:colors.white,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 30,
    },
    flatListContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
        paddingHorizontal:20
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
    button2: {
        width: 53,
        backgroundColor: colors.white,
        borderColor: colors.appPink,
        justifyContent:'center',
        alignItems:'center'
    },
    labelStyle: {
        fontSize: 16,
        color: colors.white,
    },
    labelStyle2: {
        fontSize: 26,
        color: colors.appPink,
        fontWeight:'400'
    },
})

export default homeStyles