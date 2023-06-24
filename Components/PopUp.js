import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Modal,
    Text,
    TouchableOpacity

} from 'react-native';
import colors from '../assets/colors';

export default PopUp = (props) => {

    const [tab, setTab] = useState(1)

    return (
        <Modal
            visible={props.visible}
            style={[styles.container, props.containerStyle]}
            transparent
        >
            <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.PopupContainer]}>

                    <Text style={styles.notiText}>
                        {props.NotiText}
                    </Text>
                    <View style={styles.allowdenyContainer}>
                        <TouchableOpacity style={{
                            width: "40%",
                            backgroundColor: colors.appPink,
                            height: 35,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 30

                        }}
                            onPress={() => {
                                setTab(1),
                                    props.onAllowPress()
                            }
                            }
                        >


                            <Text style={styles.allowdenyText}>
                                {'Cancel'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: "40%",
                            backgroundColor: colors.appPink,
                            height: 35,
                            borderRadius: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 30

                        }}
                            onPress={props.onOKPress}
                        >


                            <Text style={styles.allowdenyText}>
                                {'Ok'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 65,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    PopupContainer: {
        height: 150,
        width: '80%',
        backgroundColor: 'white',
        // backgroundColor: colors.darkGray,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20

    },
    notiIcon: {
        width: 30,
        height: 35,
        tintColor: 'yellow',
        marginTop: 5
    },
    imgtxtConntainer: {
        alignSelf: 'center',
        // justifyContent:''
    },
    notiText: {
        color: 'black',
        fontSize: 16,
        // fontFamily:Fonts.Regular,
        // marginLeft:20,
        // backgroundColor:'red'
    },
    allowdenyText: {
        fontSize: 16,
        color: colors.white,
        fontFamily: Fonts.SemiBold
    },
    allowdenyContainer: {
        width: '70%',
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
