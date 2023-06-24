import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

// Files
import colors from '../assets/colors';
import Fonts from '../assets/fonts';
import Images from '../assets/images/images';
import Icons from '../assets/icons/icons';

const Poll = (props) => {

    const {
        onPress,
        source,
        favorite,
        likes,
        name
    } = props

    return (
        <View style={[styles.mainContainer, {
            elevation: favorite ? 15 : 0,
            shadowColor: '#993a2b',
            shadowOffset: {
                width: -2,
                height: 4
            },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        }]}>
            <View style={styles.imageContainer}>
                <Image
                    source={source}
                    style={{ width: "100%", height: "100%", borderRadius: 2 }}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.bottomRowContainer}>
                <Text style={styles.pollName}>{name}</Text>
                <View style={styles.favoriteContainer}>
                    <Image
                        source={Icons.favoriteIcon}
                        style={{ width: 14, height: 14, marginRight: 5 }}
                        resizeMode="contain"
                    />
                    <Text style={styles.counterText}>{likes}</Text>
                </View>
            </View>
            <TouchableOpacity style={[styles.heartButtonContainer, {
                backgroundColor: favorite ? colors.appPink : colors.LightGray
            }]} onPress={onPress}>
                <Image
                    source={Icons.favoriteIcon}
                    style={{ width: 14, height: 14, tintColor: colors.white }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    )
}

export default Poll

const styles = StyleSheet.create({
    mainContainer: {
        width: '48%',
        height: 266,
        // marginRight: 20,
        marginTop: 10,
        backgroundColor: colors.white,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: colors.placeholderColor,
    },
    imageContainer: {
        width: "100%",
        height: "80%",
        borderRadius: 5,
    },
    bottomRowContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        alignItems: "center"
    },
    pollName: {
        fontFamily: Fonts.Roman,
        fontWeight: "400",
        color: colors.black,
        fontSize: 14
    },
    favoriteContainer: {
        width: 'auto',
        flexDirection: "row",
        marginLeft: "auto",
        marginTop: 10
    },
    counterText: {
        fontSize: 14,
        color: colors.counterGray,
        fontFamily: Fonts.Roman,
        fontWeight: "400",
    },
    heartButtonContainer: {
        width: 31,
        height: 31,
        borderRadius: 100,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        right: 10,
        top: "65%",
        padding: 15,
        borderColor: colors.white
    }
})