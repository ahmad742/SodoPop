import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Image,
    TextInput
} from 'react-native';

// Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-simple-toast';
// Files
import logo from '../../assets/logos/logos';
import contactStyles from './contactStyles';
import Icons from '../../assets/icons/icons';

// Components
import AuthHeader from '../../Components/AuthHeader';
import AppTextInput from '../../Components/AppTextInput';
import AppButton from '../../Components/AppButton';
import LargeTextInput from '../../Components/LargeTextInput';
import colors from '../../assets/colors';
import Loader from '../../Components/Loader'

//API
import { Contact_US_API } from '../../API/Methods/auth';


const ContactUs = ({ navigation }) => {

    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const forgotPasswordAPI = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('subject', subject)
            formData.append('message', message)
            console.log('formData-response===>>>', formData)

            const response = await Contact_US_API(formData)
            if(response?.data?.status === 200){
                Toast.show(response?.data?.message)
                navigation.goBack()
                setSubject(null)
                setMessage(null)
            }
            else if(response?.data?.status ==204){
                Toast.show(response?.data?.message)
            }
            console.log("Contact_US_API ==>>>", response.data);
        } catch (error) {
            console.log("Contact_US_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <SafeAreaView style={contactStyles.mainContainer}>
            <AuthHeader
                label={"Contact Us"}
                onBackPress={() => navigation.goBack()}
            />
            <View style={contactStyles.smain}>
                <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Image
                        source={logo.appLogo}
                        style={contactStyles.appLogo} />
                    <Text style={contactStyles.text}>{
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"}
                    </Text>
                    <AppTextInput
                        title={'Subject'}
                        placeholder={'Enter Subject'}
                        icon={Icons.subject}
                        mainContainer={{ marginVertical: 10 }}
                        value={subject}
                        onChangeText={(text) => setSubject(text)}
                    />
                    <LargeTextInput
                        title="Message"
                        placeholder="Type Text"
                        placeholderTextColor={colors.placeholderColor}
                        icon={Icons.envelopeIcon}
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                    />
                    <AppButton
                        label={'Send'}
                        mainContainer={contactStyles.button}
                        labelStyle={contactStyles.labelStyle}
                        onPress={()=>forgotPasswordAPI()} />
                </KeyboardAwareScrollView>
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default ContactUs;