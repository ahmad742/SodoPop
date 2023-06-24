import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
} from 'react-native'

// Files
import colors from '../assets/colors';
import Icons from '../assets/icons/icons';
import Fonts from '../assets/fonts';

const LargeTextInput = (props) => {

    const { title, icon, placeholder, value, onChangeText,placeholderTextColor } = props

    return (
        <View style={styles.messageContainer}>
            <Text style={styles.text}>{title}</Text>
            <View style={styles.messageInnerContainer}>
                <View style={styles.messageIconContainer}>
                    <Image
                        source={icon}
                        style={{ width: 20, height: 16 }}
                        resizeMode={'contain'}
                    />
                </View>
                <TextInput
                    style={styles.messageInput}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    multiline={true}
                    onChangeText={onChangeText}
                    value={value}
                />
            </View>
        </View>
    )
}

export default LargeTextInput

const styles = StyleSheet.create({
    messageContainer: {
        width: "100%",
        height: 190,
        // backgroundColor:'red'
    },
    text: {
        marginVertical: 10,
        fontSize: 16,
        fontFamily: Fonts.Roman,
        color: colors.black
    },
    messageInnerContainer: {
        width: "100%",
        height: "80%",
        borderWidth: 1,
        borderColor: colors.placeholderColor,
        flexDirection: "row",
        // backgroundColor:'green',

        alignItems: "flex-start"
    },
    messageIconContainer: {
        width: "15%",
        // height: "100%",
        padding: 15
    },
    messageInput: {
        width: "80%",
        lineHeight: 25,
        color:colors.black
        // backgroundColor:'red'
    }
})