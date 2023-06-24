import React from 'react';
import { StyleSheet, View, ActivityIndicator,Text } from 'react-native';
import colors from '../assets/colors';

export default Loader = (props) => {
    const { loading, style, containerStyle, color, size,isShowIndicator} = props

    if (loading)
        return (
            <View style={[styles.container]}>
                {isShowIndicator &&
                    <ActivityIndicator
                        // animating={loading}
                        animating={isShowIndicator}
                        size={size ? size : 'large'}
                        color={color ? color : colors.appPink}                    />
                }
            </View>
        )
    else return null
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        // backgroundColor: (colors.white + '30'),
        alignItems: 'center',
        justifyContent: 'center',
    }
})
