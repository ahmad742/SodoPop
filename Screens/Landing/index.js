// General Import
import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image
} from 'react-native';

// Files
import Images from '../../assets/images/images';
import Logos from '../../assets/logos/logos';
import LandingStyles from './LandingStyles';

// Components
import AppButton from '../../Components/AppButton';

const Landing = ({ navigation }) => {
    return (
        <View style={LandingStyles.mainContainer}>
            <ImageBackground source={Images.loginBackground}
                style={{ width: '100%', height: '100%' }}>
                <View style={LandingStyles.shadowContainer}>
                    <Image
                        style={{ width: '90%', height: 150, marginTop: 150 }}
                        source={Logos.appLogo}
                        resizeMode='contain'
                    />
                    <AppButton
                        label={"Login"}
                        onPress={() => navigation.navigate("Login")}
                        mainContainer={[LandingStyles.buttonStyle, { marginTop: 30 }]}
                    />
                    <AppButton
                        label={"Sign Up"}
                        onPress={() => navigation.navigate("SignUp")}
                        mainContainer={[{ marginTop: 15 }, LandingStyles.buttonStyle]}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

export default Landing;

