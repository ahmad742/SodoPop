// General Imports
import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image
} from 'react-native'
import { useSelector } from 'react-redux';

//Files
import Logos from '../assets/logos/logos';
import Images from '../assets/images/images';
import Icons from '../assets/icons/icons';

// Components
import DrawerScreenSelector from './DrawerScreenSelector';
import { useDispatch } from 'react-redux';
import { enabbleSignIn } from '../redux/actions/userSession';


const DrawerComponent = (props) => {

    const { navigation } = props
    const dispatch = useDispatch()
    const { isGuestUser } = useSelector(state => state.userSession)
    console.log("is Guest User _=====>>>>", isGuestUser);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoContainer}>
                <Image
                    style={{ width: 150, height: 150 }}
                    source={Logos.appLogo}
                    resizeMode='contain'
                />
            </View>
            <View style={styles.selectorContainer}>
                <DrawerScreenSelector
                    icon={Icons.homeIcon}
                    label={"Home"}
                    onPress={() => {
                        isGuestUser == true ?
                            alert('Please login first to perform any activity')
                            :
                            navigation.navigate("HomeScreenStack")
                    }
                    }
                />
                <DrawerScreenSelector
                    icon={Icons.profileIcon}
                    label={"Profile"}
                    onPress={() => {
                        isGuestUser == true ?
                            alert('Please login first to perform any activity')
                            :
                            navigation.navigate("ProfileScreenStack")
                    }}
                />
                <DrawerScreenSelector
                    icon={Icons.slateIcon}
                    label={"My Posts"}
                    onPress={() => {
                        isGuestUser == true ?
                            alert('Please login first to perform any activity')
                            :
                            navigation.navigate("MyPosts")
                    }}
                />
                <DrawerScreenSelector
                    icon={Icons.peopleIcon}
                    label={"Friends"}
                    onPress={() => {
                        isGuestUser ?
                            alert('Please login first to perform any activity')
                            :
                            navigation.navigate("FriendScreenStack")
                    }}
                />
                <DrawerScreenSelector
                    icon={Icons.envelopeIcon}
                    label={"Contact Us"}
                    onPress={() => navigation.navigate("ContactUs")}
                />
                <DrawerScreenSelector
                    icon={Icons.doorIcon}
                    label={"Logout"}
                    mainContainer={{ borderBottomWidth: 0 }}

                    onPress={() => {
                        dispatch(enabbleSignIn(false))
                        navigation.navigate("AuthStack")
                    }}
                />
            </View>
            <Image
                source={Images.splashBottomRightCorner}
                style={styles.bottomRightCorner}
                resizeMode="stretch"
            />
        </View>
    )
}

export default DrawerComponent

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    logoContainer: {
        marginTop: 20,
        width: "90%",
        padding: 5,
        alignSelf: "center",
        borderRadius: 100
    },
    bottomRightCorner: {
        width: 238,
        height: 200,
        marginTop: 'auto',
        marginLeft: 'auto'
    },
    selectorContainer: {
        marginTop: 15,
        width: "100%",
        padding: 10,
        alignItems: "center"
    }
})