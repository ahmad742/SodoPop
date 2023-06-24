// General Imports
import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native'

// Files
import Fonts from '../assets/fonts'
import colors from '../assets/colors'
import Icons from '../assets/icons/icons'

const AppTextInput = (props) => {

    const {
        mainContainer,
        onIconPress,
        title,
        value,
        placeholder,
        onChangeText,
        secureTextEntry,
        icon,
        keyboardType,
        inputConatiner,
        inputInnerContainer,
        multiline,
        editable,
        onSubmitEditing,
        returnKeyType
    } = props

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            {title && <Text style={styles.title}>{title}</Text>}
            <View
                style={[styles.inputConatiner, inputConatiner]}
            >
                {icon ? <TouchableOpacity
                    onPress={onIconPress}
                    disabled={onIconPress ? false : true}
                >
                    <Image
                        source={icon}
                        style={{ width: 16, height: 21, }}
                        resizeMode={'contain'}
                    />
                </TouchableOpacity> : null}
                <TextInput
                    placeholder={placeholder}
                    style={[styles.inputInnerContainer, inputInnerContainer]}
                    value={value}
                    onChangeText={onChangeText}
                    placeholderTextColor={colors.placeholderColor}
                    secureTextEntry={secureTextEntry}
                    // keyboardType={'name-phone-pad'}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    editable={editable}
                    onSubmitEditing={onSubmitEditing}
                    returnKeyType={returnKeyType}
                />
            </View>
        </View>
    )
}

export default AppTextInput;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 70,
        // backgroundColor:"red"
    },
    title: {
        fontSize: 16,
        fontFamily: Fonts.Roman,
        fontWeight: '400',
        color: colors.black
    },
    inputConatiner: {
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 5,
        paddingLeft: 15,
        borderColor: colors.LightGray,
        flexDirection: 'row',
        alignItems: 'center',
        height:"80%"

    },
    inputInnerContainer: {
        width: '80%',
        height: '100%',
        marginLeft: 15,
        color: colors.black,
        fontSize: 16,
        fontFamily: Fonts.Roman,
        fontWeight: '400',
        alignItems:"center",
        // backgroundColor:'yellow'
    }
})