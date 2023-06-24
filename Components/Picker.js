import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Modal
} from 'react-native';

// Libraries
import { Select } from "native-base";


// Files
import Fonts from '../assets/fonts'
import colors from '../assets/colors';
import Icons from '../assets/icons/icons';

const Picker = (props) => {

    const [service, setService] = useState("");

    const {
        mainContainer,
        list = [],
        showList,
        selectedItem = () => { },
        onArrowPress,
        label,
        title,
        placeholder,
        icon
    } = props



    useEffect(() => {
    }, [list])

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <Text style={styles.title}>
                {title}
            </Text>
            <View style={styles.rowContainer}>
                <View style={styles.leftRowContainer}>
                    <Image
                        source={icon}
                        style={styles.iconStyle}
                        resizeMode="contain"
                    />
                </View>

                <Select
                    selectedValue={service}
                    minWidth="275"
                    accessibilityLabel="Choose Option"
                    placeholder={placeholder}
                    marginBottom={1}
                    onValueChange={itemValue => {
                        let tempVar = ''
                        list.forEach(element => {
                            if (element?.id === itemValue) {
                                console.log("elemennt==>>", element);
                                tempVar = element
                            }
                        });
                        setService(itemValue)
                        selectedItem(tempVar)
                    }}

                    borderWidth={0}

                >
                    {
                        list?.map((item) => {

                            return (
                                <Select.Item key={item?.id} label={item?.label || item?.name} value={item?.id} />

                            )
                        })
                    }
                </Select>
            </View>
        </View>
    )
}

export default Picker

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: 100,
        padding: 1,
    },
    title: {
        fontFamily: Fonts.Roman,
        color: colors.black,
        fontSize: 16,
        marginBottom: 10,
        fontWeight: "400"
    },
    rowContainer: {
        width: "100%",
        height: '60%',
        flexDirection: "row",
        // justifyContent: "space-between",
        // backgroundColor: "red",
        alignItems: "center",
        alignSelf: "center",
        // justifyContent: "center",
        // backgroundColor:"red",
        borderWidth: 1,
        borderRadius: 1,
        borderColor: colors.placeholderColor
    },
    leftRowContainer: {
        flexDirection: "row",
        width: "10%",
        height: "100%",
        alignItems: "center",
        paddingHorizontal: 15,
        // backgroundColor:'red'
    },
    iconStyle: {
        width: 16,
        height: 20,
    },
    labelText: {
        fontFamily: Fonts.Roman,
        fontSize: 16,
        fontWeight: "400",
        color: colors.placeholderColor,
        marginLeft: 20
    },
    arrowContainer: {
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    flatListContainer: {
        width: "100%",
        height: 120,
        position: "absolute",
        zIndex: 1,
        top: 85,
        backgroundColor: colors.white
    },
    listContainer: {
        width: "100%",
        alignItems: 'center',
        padding: 5
    },
    listRowContainer: {
        width: "100%",
        height: 40,
        borderBottomWidth: 1,
        borderColor: colors.placeholderColor,
    },
    listLabel: {
        fontFamily: Fonts.Roman,
        fontSize: 15,
        fontWeight: "400",
        color: colors.black,
        marginLeft: 5
    }
})