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
import Toast from 'react-native-simple-toast'
// Files
import styles from './styles';
import Logos from '../../assets/logos/logos';
import Images from '../../assets/images/images';
import Icons from '../../assets/icons/icons';

// Components
import AuthHeader from '../../Components/AuthHeader';
import AppButton from '../../Components/AppButton';
import AppTextInput from '../../Components/AppTextInput';
import Loader from '../../Components/Loader'

//API
import { Report_Poll_API } from '../../API/Methods/auth';

const ReportProblem = ({ navigation, route }) => {

    const PollData = route?.params?.PollData
    // console.log("PollData::::::",PollData);
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [description, setDescription] = useState(true)
    const [loading, setLoading] = useState(false)

    const ReportPoll = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('poll_id', PollData)
            formData.append('name', fullname)
            formData.append('email', email)
            formData.append('subject', subject)
            formData.append('description', description)
            console.log(" Report_Poll_API  FormData ==>>", formData);
            const response = await Report_Poll_API(formData)
            console.log("response Report_Poll_API", response?.data);
            if (response.data.status == 200) {
                Toast.show(response?.data?.message)
                setFullname(null)
                setEmail(null)
                setSubject(null)
                setDescription(null)
            }
            // else if (response.data.status == 204) {
            //     Toast.show(response?.data?.message)
            // }
        } catch (error) {
            console.log("Report_Poll_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AuthHeader
                label={"Report"}
                onBackPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ flexGrow: 1 }}>
                <View style={styles.innerContainer}>
                    <AppTextInput
                        title={"Full Name"}
                        placeholder={"Name"}
                        icon={Icons.lockIcon}
                        value={fullname}
                        onChangeText={(text) => setFullname(text)}
                        mainContainer={styles.textInput}
                    />
                    <AppTextInput
                        title={"Email"}
                        placeholder={"Enter Email"}
                        icon={Icons.lockIcon}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        mainContainer={styles.textInput}
                    />
                    <AppTextInput
                        title={"Subject"}
                        placeholder={"Enter Subject"}
                        icon={Icons.lockIcon}
                        value={subject}
                        onChangeText={(text) => setSubject(text)}
                        mainContainer={styles.textInput}
                    />
                    <AppTextInput
                        title={"Description"}
                        placeholder={"Description"}
                        icon={Icons.lockIcon}
                        value={description}
                        returnKeyType={'default'}
                        multiline={true}
                        onChangeText={(text) => setDescription(text)}
                        mainContainer={[styles.textInput,{height:149}]}
                    />
                    <AppButton
                        label="Report"
                        mainContainer={styles.buttonContainer}
                        onPress={()=>ReportPoll()}
                    />
                </View>
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default ReportProblem;
