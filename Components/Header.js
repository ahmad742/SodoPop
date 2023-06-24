import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native'
import React from 'react'

import Icons from '../assets/icons/icons'
import colors from '../assets/colors'
import Fonts from '../assets/fonts'

const Header = (props) => {

    const {
        mainContainer,
        onMenuPress,
        label,
        onNotificationPress,
        onSearchhPress
    } = props
    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <TouchableOpacity style={styles.backIcon}
                onPress={onMenuPress}
            >
                <Image
                    source={Icons.menuIcon}
                    style={styles.iconStyle}
                />
            </TouchableOpacity>
            <Text style={styles.label}>{label?.toUpperCase()}</Text>

            <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={onNotificationPress}>
                    <Image
                        source={Icons.notificationIcon}
                        style={styles.iconStyle}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                onPress={onSearchhPress}
                style={{marginHorizontal:12}}
                >
                    <Image
                        source={Icons.searchIcon}
                        style={styles.iconStyle}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        source={Icons.filterIcon}
                        style={styles.iconStyle}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 90,
        backgroundColor: colors.appPink,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    backIcon: {
        // position: 'absolute',
        // left: 15,
        // bottom: 18,
        width:40,
        height:30,
        alignItems:'center',
        // justifyContent:'flex-end',
        paddingTop:10,
        // paddingVertical:40,
        tintColor: colors.white
    },
    label: {
        fontSize: 20,
        fontFamily: Fonts.Roman,
        color: colors.white,
        // position: 'absolute',
        // bottom: 15,
        textAlign:'center',
        marginTop: 10,
        fontWeight: '400',
        left:25
    },
    iconStyle: {
        width: 20,
        height: 18
    }
})