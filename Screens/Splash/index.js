// General react imports

import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView
} from 'react-native'

// Libraries
import { useIsFocused } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
//Files import
import styles from './Style'

import Logos from '../../assets/logos/logos'
import Images from '../../assets/images/images'


const Splash = ({ navigation }) => {

    const isFocused = useIsFocused()

    const { token,isSignedIn } = useSelector(state => state.userSession)
    // console.log('signuptoken ====>>>', token);


    useEffect(() => {
        setTimeout(() => {
            {
                token && isSignedIn ?
                    navigation.navigate('AppStack')
                    :
                    navigation.navigate("AuthStack")
            }

        }, 3000)
    }, [isFocused])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                source={Images.splashUpperLeftCorner}
                style={{ width: 200, height: 200 }}
                resizeMode="contain"
            />
            <View style={styles.innerContainer}>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={Logos.appLogo}
                    resizeMode='contain'
                />
                <Image
                    source={Images.splashDescription}
                    style={{ width: 200, height: 100 }}
                />
            </View>
            <Image
                source={Images.splashBottomRightCorner}
                style={styles.bottomRightCorner}
                resizeMode="stretch"
            />
        </SafeAreaView>
    )
}

export default Splash
