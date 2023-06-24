// General React Imports
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Image,
    Text,
} from 'react-native';

// Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast';
// Files
import forgotPasswordStyles from './forgotPasswordStyles';
import Logos from '../../assets/logos/logos';
import Images from '../../assets/images/images';
import Icons from '../../assets/icons/icons';

// Components
import AuthHeader from '../../Components/AuthHeader';
import AppButton from '../../Components/AppButton';
import AppTextInput from '../../Components/AppTextInput';
import Loader from '../../Components/Loader';

// API
import { Forgot_Password_API } from '../../API/Methods/auth';

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('')
    
    const [loading, setLoading] = useState(false)


    const inputCheck = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
         if (email === '') {
            Toast.show('Enter a Email')
        }
        else if (reg.test(email) === false) {
            Toast.show("Enter a correct Email")
        }

        else {
            forgotPasswordAPI()
        }
    }


    const forgotPasswordAPI = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('email', email)
            console.log('formData-response===>>>', formData)

            const response = await Forgot_Password_API(formData)
            console.log("Forgot_Password_API ==>>>", response.data);
            if (response.data.status == 200) {
                Toast.show(response.data.message)
                navigation.goBack()
                setEmail(null)
            }
            else if(response.data.status == 400){
                Toast.show(response.data.message)
            }
        } catch (error) {
            console.log("Forgot_Password_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={forgotPasswordStyles.mainContainer}>
            <AuthHeader
                label={"Forgot Password"}
                onBackPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ flexGrow: 1 }}>
                <View style={forgotPasswordStyles.innerContainer}>
                    <View style={forgotPasswordStyles.roundContainer}>
                        <Image
                            source={Logos.lockRoundLogo}
                            style={{ height: '100%', width: '100%' }}
                            resizeMode="contain"
                        />
                    </View>
                    <Text style={forgotPasswordStyles.infoText}>{"Please enter your Email address below, we will send you instructions to reset your password"}</Text>
                    <AppTextInput
                        title={"Email"}
                        placeholder={"Enter Email"}
                        icon={Icons.mailIcon}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        mainContainer={forgotPasswordStyles.textInput}
                        keyboardType={"email-address"}
                    />
                    <AppButton
                        label="Send"
                        mainContainer={forgotPasswordStyles.buttonContainer}
                        onPress={()=>inputCheck()}
                        // onPress={()=>navigation.navigate("ChangePassword")}
                    />
                </View>
                <Image
                    source={Images.splashBottomRightCorner}
                    style={forgotPasswordStyles.bottomRightCorner}
                    resizeMode="stretch"
                />
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default ForgotPassword
