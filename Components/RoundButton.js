import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

// Files
import colors from '../assets/colors';
import Icons from '../assets/icons/icons';

const RoundButton = (props) => {

    const { mainContainer, onPress } = props

    return (
        <TouchableOpacity style={[styles.mainContainer, mainContainer]} onPress={onPress}>
            <Image
                source={Icons.addIcon}
                style={{ width: 20, height: 20 }}
            />
        </TouchableOpacity>
    )
}

export default RoundButton

const styles = StyleSheet.create({
    mainContainer: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: colors.appPink,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute"
    }
})