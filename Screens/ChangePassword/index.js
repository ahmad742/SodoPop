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
import Toast from 'react-native-simple-toast';
// Files
import changePasswordStyles from './changePasswordStyles';
import Logos from '../../assets/logos/logos';
import Images from '../../assets/images/images';
import Icons from '../../assets/icons/icons';

// Components
import AuthHeader from '../../Components/AuthHeader';
import AppButton from '../../Components/AppButton';
import AppTextInput from '../../Components/AppTextInput';
import Loader from '../../Components/Loader';

//API
import {Change_Password_API} from '../../API/Methods/auth'

const ChangePassword = ({ navigation }) => {

    const [currentPasword, setCurrentPassword] = useState('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(true)
    const [newPassword, setNewPassword] = useState('')
    const [showNewPassword, setShowNewPassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputCheck = () => {
        if (currentPasword === '') {
            Toast.show("Password is required")
        }
       else if (newPassword === '') {
            Toast.show("newPassword is required")
        }
       else if (confirmPassword === '') {
            Toast.show("confirmPassword is required")
        }
        else if (newPassword.length < 6) {
            Toast.show("Password more then 6 Characters")
        }
        else if (confirmPassword.length < 6) {
            Toast.show("Password more then 6 Characters")
        }
        else if(newPassword !== confirmPassword) {
            Toast.show('Password does not match')
        }
        else {
            ChangePasswordAPI()
        }
    }


    const ChangePasswordAPI = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('old_password', currentPasword)
            formData.append('new_password', newPassword)
            console.log('formData-response===>>>', formData)

            const response = await Change_Password_API(formData)
            console.log("Change_Password_API ==>>>", response.data);
            if (response.data.status == 200) {
                Toast.show(response.data.message)
                navigation.goBack()
                setCurrentPassword(null)
                setNewPassword(null)
                setConfirmPassword(null)
                
            }
            else if(response.data.status == 400){
                Toast.show(response.data.message)
            }
        } catch (error) {
            console.log("Change_Password_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={changePasswordStyles.mainContainer}>
            <AuthHeader
                label={"Change Password"}
                onBackPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ flexGrow: 1 }}>
                <View style={changePasswordStyles.innerContainer}>
                    <View style={changePasswordStyles.roundContainer}>
                        <Image
                            source={Logos.lockRoundLogo}
                            style={{ height: '100%', width: '100%' }}
                            resizeMode="contain"
                        />
                    </View>
                    <AppTextInput
                        title={"Current Password"}
                        placeholder={"********"}
                        icon={Icons.lockIcon}
                        value={currentPasword}
                        onChangeText={(text) => setCurrentPassword(text)}
                        mainContainer={changePasswordStyles.textInput}
                        secureTextEntry={showCurrentPassword}
                        onIconPress={() => setShowCurrentPassword(!showCurrentPassword)}
                    />
                    <AppTextInput
                        title={"New Password"}
                        placeholder={"********"}
                        icon={Icons.lockIcon}
                        value={newPassword}
                        onChangeText={(text) => setNewPassword(text)}
                        mainContainer={changePasswordStyles.textInput}
                        secureTextEntry={showNewPassword}
                        onIconPress={() => setShowNewPassword(!showNewPassword)}
                    />
                    <AppTextInput
                        title={"Confirm New Password"}
                        placeholder={"********"}
                        icon={Icons.lockIcon}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        mainContainer={changePasswordStyles.textInput}
                        secureTextEntry={showConfirmPassword}
                        onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    <AppButton
                        label="Send"
                        mainContainer={changePasswordStyles.buttonContainer}
                        onPress={()=>inputCheck()}
                    />
                </View>
                <Image
                    source={Images.splashBottomRightCorner}
                    style={changePasswordStyles.bottomRightCorner}
                    resizeMode="stretch"
                />
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default ChangePassword;
