// General Imports
import React from 'react'
import {
    StyleSheet,
    Text,
    View
} from 'react-native'

// Files
import Fonts from '../assets/fonts'
import colors from '../assets/colors'
import AppButton from './AppButton'

const AuthBottomContainer = (props) => {

    const {
        mainContainer,
        onPress,
        buttonLabel,
        message,
        actionLabel,
        labelAllCaps,
        onActionPress,
    } = props

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            {onPress ? <AppButton
                label={buttonLabel}
                onPress={onPress}
                mainContainer={styles.button}
            />:null}
            <View style={styles.rowContainer}>
                <Text style={styles.messageText}>{message}</Text>
                <Text style={styles.actionText} onPress={onActionPress}>{labelAllCaps ? actionLabel.toUpperCase() : actionLabel}</Text>
            </View>
        </View>
    )
}

export default AuthBottomContainer

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        padding: 10,
        // height: 180,
        marginTop: 'auto',
        // position:'absolute',
        // bottom:0,
        backgroundColor: colors.appPink,
    },
    button: {
        marginTop: 15,
        marginBottom:50
    },
    rowContainer: {
        marginTop: "auto",
        width: "auto",
        alignSelf: 'center',
        flexDirection: "row",
        marginBottom: 10
    },
    messageText: {
        fontSize: 16,
        fontFamily: Fonts.Roman,
        fontWeight: '400',
        color: colors.white
    },
    actionText: {
        fontSize: 16,
        fontFamily: Fonts.Roman,
        fontWeight: '700',
        color: colors.white,
        marginHorizontal: 5
    }
})