import React from 'react'
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image } from 'react-native'
import Fonts from '../assets/fonts/index'
import colors from '../assets/colors'

const CheckBox = (props) => {
    return (
        <View style={[styles.mainContainer, props.mainContainerStyle]}>
            <TouchableOpacity
                activeOpacity={0.6}
                style={[styles.container, props.checkboxStyle]}
                onPress={props.onPress}
            >
                <Image
                    source={props.source}
                    style={{ height: "60%", width: '60%', resizeMode: "contain" }}
                />
            </TouchableOpacity>
            <TouchableOpacity
            onPress={props.onLabelPress}
            activeOpacity={0.6}>
            <Text style={[styles.text, props.checkBoxText]}>{props.label}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CheckBox

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginLeft:1
    },
    container: {
        backgroundColor: colors.white,
        height: 18,
        width: 18,
        borderWidth: 0.5,
        borderColor: colors.counterGray,
        alignItems: 'center',
        justifyContent: "center",
        elevation: 3,
        shadowOpacity: 0.5,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
    },
    text: {
        marginLeft: 10,
        color: colors.black,
        fontFamily: Fonts.Roman,
    },
})