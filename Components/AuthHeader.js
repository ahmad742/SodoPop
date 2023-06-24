// General react imports 
import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'

// Files
import Icons from '../assets/icons/icons'
import colors from '../assets/colors'
import Fonts from '../assets/fonts'

const AuthHeader = (props) => {

    const { mainContainer, label, onBackPress, rightIcon, onRighIconPress } = props

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <TouchableOpacity style={styles.backIcon}
                onPress={onBackPress}
            >
                <Image
                    source={Icons.arrowBack}
                    style={{
                        width: 18,
                        height: 18,
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={styles.label}>{label?.toUpperCase()}</Text>
            {rightIcon ? <TouchableOpacity style={styles.rightIcon}
                onPress={onRighIconPress}
            >
                <Image
                    source={rightIcon}
                    style={{
                        width: 18,
                        height: 18,
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity> : null}
        </View>
    )
}

export default AuthHeader

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 90,
        backgroundColor: colors.appPink,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backIcon: {
        position: 'absolute',
        left: 15,
        bottom: 18,
        height: 30,
        width: 30,
        paddingTop: 10,
        tintColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    rightIcon: {
        position: 'absolute',
        right: 15,
        bottom: 18,
        height: 30,
        width: 30,
        paddingTop: 10,
        tintColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 20,
        fontFamily: Fonts.Roman,
        color: colors.white,
        position: 'absolute',
        bottom: 15,
        fontWeight: '400',
    }
})