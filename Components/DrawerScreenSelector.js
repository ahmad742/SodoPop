import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

// Files
import colors from '../assets/colors'
import Fonts from '../assets/fonts';
import Icons from '../assets/icons/icons';

const DrawerScreenSelector = (props) => {

    const { icon, label, onPress, mainContainer } = props

    return (
        <TouchableOpacity style={[styles.mainContainer, mainContainer]} onPress={onPress}>
            <Image
                source={icon}
                style={{ width: 20, height: 18, }}
                resizeMode={"contain"}
            />
            <Text style={styles.labelStyle}>{label}</Text>
        </TouchableOpacity>
    )
}

export default DrawerScreenSelector;

const styles = StyleSheet.create({
    mainContainer: {
        width: "90%",
        borderBottomWidth: 1,
        borderColor: colors.placeholderColor,
        flexDirection: 'row',
        alignItems: "center",
        paddingVertical: 18,
    },
    labelStyle: {
        fontSize: 18,
        fontFamily: Fonts.Roman,
        fontWeight: '400',
        color: colors.black,
        marginHorizontal: 20
    }
})