import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
} from 'react-native';

// Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Toast from 'react-native-simple-toast'
import moment from 'moment'
// Files
import createPollStyles from './createPollStyles';
import Icons from '../../assets/icons/icons';
import colors from '../../assets/colors';

// Components
import AuthHeader from '../../Components/AuthHeader';
import AddPoll from '../../Components/AddPoll';
import AppButton from '../../Components/AppButton';
import Picker from '../../Components/Picker';
import AppTextInput from '../../Components/AppTextInput'
import Loader from '../../Components/Loader';
import CustomModal from '../../Components/CustomModal';

//API
import { Create_Poll_API, Hash_Tag_List_API } from '../../API/Methods/auth';
import { useIsFocused } from '@react-navigation/native';

const CreatePoll = ({ navigation }) => {

    const isFocused = useIsFocused()

    const policies = [
        {
            id: "1",
            label: "Public",
        },
        {
            id: "2",
            label: "Private",
        },
        {
            id: "3",
            label: "Protected",
        },
    ]

    const locations = [
        {
            id: "1",
            label: "New York",
        },
        {
            id: "2",
            label: "Chicago",
        },
        {
            id: "3",
            label: "Los Angles",
        },
        {
            id: "4",
            label: "Hueston",
        },
        {
            id: "5",
            label: "Las Vagas",
        },
    ]

    useEffect(() => {
        hashTagList()
    }, [isFocused])

    const [showPrivacyList, setShowPrivacyList] = useState(false)
    const [selectedPrivacy, setSelectedPrivacy] = useState('')

    const [showTagsList, setShowTagsList] = useState(false)
    const [selectedTag, setSelectedTag] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showLocationList, setShowLocationList] = useState(false)
    const [selectedLocation, setSelectedLocation] = useState('')
    const [datePicker, setDatePicker] = useState(false);
    const [isPoll1, setIsPoll1] = useState(false)
    const [pollendDate, setPollendDate] = useState('')
    const [hashTag, setHashTag] = useState('')
    const [poll1, setPoll1] = useState(null)
    const [poll2, setPoll2] = useState(null)
    const [text1, setText1] = useState('')
    const [text2, setText2] = useState('')
    const [isFirstPoll, setIsFirstPoll] = useState(false)
    const [policy, setPolicy] = useState('false')
    const [tag, setTag] = useState('')

    const [service, setService] = React.useState("");
    const [loading, setLoading] = useState(false)
    const options = {
        opacity: 0.3,
        mediaType: 'image',
        quality: 0.1,

    }
    const handleConfirm = (date) => {

        setDatePicker(false);
        console.warn("A date has been picked: ", date);
        let strDate = moment(date).format('DD/MM/YYYY')
        setPollendDate(strDate)
    };

    const createPoll = async () => {
        let date = pollendDate.split()
        // console.log("policies?.label?.name==>>", policies[0]?.label);
        // return false
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('privacy', policy)
            formData.append('lat', '23.333333')
            formData.append('long', '33.333333')
            formData.append('time', date[0])
            formData.append('post_image[0]', poll1)
            formData.append('post_image[1]', poll2)
            formData.append('tags[0]', tag)
            formData.append('tags[1]', tag)
            formData.append('text[0]', text1)
            formData.append('text[1]', text2)
            // tag.forEach((element, index) => {
            //     formData.append(`tags[]`, element)
            //     console.log("Elemet ====>>>", element);
            // });
            console.log('formData-response===>>>', formData)
            // return
            const response = await Create_Poll_API(formData)
            console.log("Create_Poll_API ==>>>", response.data);
            if (response.data.status == 200) {
                Toast.show(response?.data?.message)
                navigation.goBack()
            }
            if (response.data.status == 202) {
                Toast.show(response?.data?.message)
            }
        } catch (error) {
            console.log("Create_Poll_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }
    const hashTagList = async () => {
        setLoading(true)
        try {
            const response = await Hash_Tag_List_API()
            // console.log("Hash_Tag_List_API ==>>>", response.data?.hashTags);s
            if (response.data.status == 200) {
                setHashTag(response?.data?.hashTags)
                // console.log(" HASH TAGS ==>>.", hashTag);
            }
        } catch (error) {
            console.log("Hash_Tag_List_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }

    const showCamera = () => {
        launchCamera(options, callback);
        // setImage(false)
        // uri = null
    }
    const showLibrary = (poll) => {
        if (poll === 'poll1') {
            launchImageLibrary(options, callback)
        }
        else if ('poll2') {
            launchImageLibrary(options, callback)
        }
        // setImage(false)
        // uri = null
    }

    // const callback = async response => {
    //     if (response.didCancel) {
    //         console.log("User Cancelled Image Picker")
    //         // uri = userInfo?.profile_picture
    //     }
    //     else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     }
    //     else {
    //         const source = {
    //             uri: response.assets[0].uri,
    //             name: response.assets[0].fileName,
    //             type: response.assets[0].type,
    //         };
    //         setPoll1(source)
    //     }
    // }
    const callback = async response => {
        if (response.didCancel) {
            console.log("User Cancelled Image Picker")
            // uri = userInfo?.profile_picture
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            setShowModal(false)
            const source = {
                uri: response?.assets[0]?.uri,
                name: response?.assets[0]?.fileName,
                type: response?.assets[0]?.type,
            };
            console.log("source==>>", source);
            if (isFirstPoll) {
                console.log("isImage==>", poll1);
                setPoll1(source)
                console.log("source Image ===>>>", source);
            }
            else {
                console.log("isImage==>", poll2);
                setPoll2(source)
                console.log("source Image ===>>>", source);
            }
        }
    }
    // const callback2 = async response => {
    //     if (response.didCancel) {
    //         console.log("User Cancelled Image Picker")
    //         // uri = userInfo?.profile_picture
    //     }
    //     else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     }
    //     else {
    //         setShowModal(false)
    //         const source = {
    //             uri: response.assets[0].uri,
    //             name: response.assets[0].fileName,
    //             type: response.assets[0].type,
    //         };
    //         setPoll2(source)
    //     }
    // }

    return (
        <SafeAreaView style={createPollStyles.mainContainer}>
            <AuthHeader
                label={"Create Poll"}
                onBackPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}>
                <View style={createPollStyles.innerContainer}>
                    <View style={createPollStyles.rowContainer}>
                        <AddPoll
                            label="Add Image"
                            placeholder="Contestant Name"
                            onPress={() => {
                                setIsFirstPoll(true)
                                setShowModal(true)
                            }}
                            post={poll1}
                            onChangeText={(text) => setText1(text)}
                            value={text1}
                        />
                        <AddPoll
                            label="Add Image"
                            placeholder="Contestant Name"
                            onPress={() => {
                                setIsFirstPoll(false)
                                setShowModal(true)
                            }}
                            post={poll2}
                            onChangeText={(text) => setText2(text)}
                            value={text2}
                        />
                    </View>

                    <Picker
                        title="Privacy Policy"
                        placeholder="Choose Privacy"
                        icon={Icons.Sheild}
                        list={policies}
                        selectedItem={(value) => setPolicy(value?.label)}
                    />
                    {hashTag?.length > 0 ? <Picker
                        title="Create Hastags"
                        placeholder="#Tags"
                        icon={Icons.Tag}
                        list={hashTag}
                        selectedItem={(value) => setTag(value?.id)}
                    // list={tags}
                    /> : null}
                    <Picker
                        title="Location"
                        placeholder="Choose"
                        icon={Icons.locationIcon}
                        list={locations}
                    />
                    <AppTextInput
                        title={'End Date'}
                        placeholder={'Enter Poll End Date'}
                        icon={Icons.date}
                        onIconPress={() => setDatePicker(true)}
                        // onChangeText={(text) => setDob(text)}
                        value={pollendDate}
                        editable={false}
                    />
                    <AppButton
                        mainContainer={createPollStyles.postButton}
                        label="Post"
                        onPress={() => createPoll()}
                    />
                </View>
            </KeyboardAwareScrollView>
            <DateTimePickerModal
                isVisible={datePicker}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePicker(false)}
            />
            <CustomModal
                isVisible={showModal}
                onCamerPress={() => showCamera()}
                onLibraryPress={() => showLibrary()}
                onCancelPress={() => setShowModal(false)}
            />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView >
    )
}

export default CreatePoll;
