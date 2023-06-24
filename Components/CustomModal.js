import React, { useState } from "react";
import {
    View,
    StyleSheet,
    Alert,
    Text,
    Dimensions,
    Modal
} from "react-native";

// Files
import colors from "../assets/colors";
import Fonts from "../assets/fonts";

// Components
import AppButton from "./AppButton";

const CustomModal = (props) => {

    return (
        <View>
            <Modal
                visible={props.isVisible}
                transparent={true}
            >
                <View style={styles.container}>
                    <Text style={styles.containerHeader}>Choose Option!</Text>
                    <AppButton
                        mainContainer={styles.buttonStyle}
                        label={"Open Camera"}
                        onPress={props.onCamerPress}
                        labelStyle={styles.buttonText}

                    />
                    <AppButton
                        onPress={props.onLibraryPress}
                        mainContainer={styles.buttonStyle}
                        label={"Open Library"}
                        labelStyle={styles.buttonText}
                    />
                    <AppButton
                        mainContainer={styles.cancelButton}
                        label={"Cancel"}
                        onPress={props.onCancelPress}
                        labelStyle={styles.buttonText}
                    />
                </View>
            </Modal>
        </View>
    )
}

export default CustomModal;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        alignSelf: 'center',
        height: 200,
        width: '80%',
        marginTop: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    containerHeader: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'auto',
        marginBottom: 10
    },
    buttonStyle: {
        backgroundColor: colors.appPink,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5
    },
    buttonText: {
        color: colors.white,
        fontFamily: Fonts.Roman,
        fontWeight: "400",
        fontSize: 18
    },
    cancelButton: {
        backgroundColor: colors.appPink,
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        margin: 5
    }
})