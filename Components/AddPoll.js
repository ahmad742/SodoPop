import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native';


// Files
import colors from '../assets/colors';
import Fonts from '../assets/fonts';
import Icons from '../assets/icons/icons';
import AppTextInput from './AppTextInput';

const AddPoll = (props) => {

    const { onPress, label, placeholder, mainContainer, post,onChangeText, value } = props

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <TouchableOpacity style={styles.imageButton}
                onPress={onPress}
            >
                <Image
                    style={{ width: "100%", height: post ? "100%" : "80%", }}
                    resizeMode={post ? "cover" : "contain"}
                    source={post || Icons.personIcon}
                />
                {!post ? <Text style={styles.labelText}>{label}</Text> : null}
            </TouchableOpacity>
            <TextInput
                style={styles.inputStyle}
                placeholder="Contestant Name"
                placeholderTextColor={colors.placeholderColor}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )
}

export default AddPoll

const styles = StyleSheet.create({
    mainContainer: {
        width: "50%",
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 5
    },
    imageButton: {
        width: "100%",
        height: 200,
        borderWidth: 1,
        borderColor: colors.placeholderColor,
        borderStyle: "dotted",
        alignItems: "center",
        alignSelf: "center"
    },
    labelText: {
        fontFamily: Fonts.Roman,
        fontWeight: "400",
        fontSize: 14,
        color: colors.whiteGray
    },
    inputStyle: {
        borderRadius: 0,
        borderWidth: 1,
        width: "100%",
        marginTop: 5,
        paddingHorizontal: 10,
        color: colors.black,
        borderColor: colors.placeholderColor,
        height:50
    },
    placeholderColor: {
        color: colors.placeholderColor
    }
})