// General React Imports
import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native'

// Files
import colors from '../assets/colors'
import Fonts from '../assets/fonts';

const AppButton = (props) => {

    const { onPress, mainContainer, label, labelStyle } = props

    return (
        <TouchableOpacity style={[styles.mainContainer, mainContainer]} onPress={onPress}>
            <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>
        </TouchableOpacity>
    )
}

export default AppButton

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 55,
        borderWidth: 0.5,
        borderColor: colors.white,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 2,
    },
    labelStyle: {
        fontSize: 24,
        fontFamily: Fonts.Roman,
        color: colors.white,
    }
})