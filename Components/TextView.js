import { StyleSheet, Text, View, Image, } from 'react-native'
import React from 'react'
import colors from '../assets/colors'
import Icons from '../assets/icons/icons'

const TextView = (props) => {
    const { Title, date, icon } = props
    return (
        <View style={styles.mainContainer}>
            <View style={styles.rowContainer}>
                <Image
                    source={icon}
                    style={{ width: 18, height: 18, resizeMode: 'center' }} />
                <Text style={styles.titleText}>{Title}</Text>
            </View>
            <Text style={styles.dateText}>{date}</Text>
            {/* <View style={{ borderBottomColor: colors.placeholderColor, borderWidth: 1, marginHorizontal: '5%', marginVertical: '5%' }} /> */}
        </View>
    )
}

export default TextView

const styles = StyleSheet.create({
    mainContainer: {
        width: "90%",
        alignSelf:'center',
        borderBottomWidth:1,
        borderColor:colors.placeholderColor,
        paddingBottom:15
    },
    rowContainer: {
        flexDirection: 'row',
        width: '100%',
        // paddingHorizontal: '3%',
        marginTop: '5%'
    },
    titleText: {
        color: colors.black,
        marginLeft: 15
    },
    dateText: {
        marginLeft: '10%',
        color: colors.LightGray,
        marginTop:5
    }
})