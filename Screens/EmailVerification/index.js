// General Imports
import React, { useState } from 'react';
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

// Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast'
import { StackActions } from '@react-navigation/native';
// Files
import VerificationStyles from './verificationStyles';
import Logos from '../../assets/logos/logos';
import Images from '../../assets/images/images';

// Components
import AuthHeader from '../../Components/AuthHeader';
import OTPInput from '../../Components/OTPInput';
import AppButton from '../../Components/AppButton';
import Loader from '../../Components/Loader';

//API
import { OTP_Verification_API, Resend_OTP_API } from '../../API/Methods/auth';


const EmailVerification = ({ navigation, route }) => {

    const Email = route?.params?.Email
    const UserName = route?.params?.UserName
    console.log("email ===== ?>>>>>>", Email);
let UserEmail = Email
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)


    const inputCheck = () => {
        if (otp === '') {
            Toast.show('Enter a OTP')
        }
        else if (otp.length < 4) {
            Toast.show("Enter Correct OTP")
        }
        else {
            VerifyOtp()
        }
    }


    const VerifyOtp = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('otp', otp)
            formData.append('email', Email)

            const response = await OTP_Verification_API(formData)



            console.log('OTP_Verification_API-response===>>>', response.data)
            if (response.data.status == 200) {
                Toast.show(response.data.message)
                navigation.navigate('ProfileSetup',{UserName: UserName})
            }
            else if (response.data.status == 202) {
                Toast.show(response.data.message)
            }
        } catch (error) {
            console.log("OTP_Verification_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }
    const ResendOTP = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('email', Email)

            const response = await Resend_OTP_API(formData)



            console.log('OTP_Verification_API-response===>>>', response.data)
            if (response.data.status == 200) {
                Toast.show(response.data.message)
            }
        } catch (error) {
            console.log("OTP_Verification_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={VerificationStyles.mainContainer}>
            <AuthHeader
                label={"Email Verification"}
                onBackPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ flexGrow: 1 }}
            >
                <View style={VerificationStyles.innerContainer}>
                    <View style={VerificationStyles.roundContainer}>
                        <Image
                            source={Logos.mailRoundLogo}
                            style={{ height: '100%', width: '100%' }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={VerificationStyles.infoText}>{"Please enter 4 digit code that you received in email."}</Text>

                    <OTPInput
                        onComplete={(code) => {
                            setOtp(code)
                        }}
                    />
                    <AppButton
                        mainContainer={VerificationStyles.buttonStyle}
                        label="Verify and Create Account"
                        onPress={() => inputCheck()}
                    />
                    <View style={VerificationStyles.rowContainer}>
                        <Text style={VerificationStyles.receiveCodeText}>{"Don’t receive code?"}</Text>
                        <TouchableOpacity
                            onPress={() => ResendOTP()}
                            style={VerificationStyles.resendTextContainer}>
                            <Text style={VerificationStyles.resendText}>{"Resend"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <Image
                    source={Images.splashBottomRightCorner}
                    style={VerificationStyles.bottomRightCorner}
                    resizeMode="stretch"
                />
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default EmailVerification;
