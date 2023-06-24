import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList
} from 'react-native';

// Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment'
// Files
import Images from '../../assets/images/images'
import profileSetupStyles from './profileSetupStyles';
import Icons from '../../assets/icons/icons';
import colors from '../../assets/colors';

// Components
import Header from '../../Components/AuthHeader';
import AppTextInput from '../../Components/AppTextInput';
import CheckBox from '../../Components/CheckBox';
import AppButton from '../../Components/AppButton';
import CustomModal from '../../Components/CustomModal';
import Loader from '../../Components/Loader';
import Picker from '../../Components/Picker';
//API
import { Update_Profile_API, GetProfileAPI, Get_Interests_API } from '../../API/Methods/auth';
import { IMAGE_URL } from '../../API/config';
import { ItemClick } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';


const EditProfile = ({ navigation, route }) => {

    const { email, isSignedIn } = useSelector(state => state.userSession)
    const [showModal, setShowModal] = useState(false)
    const [isImage, setIsImage] = useState(false)
    const [coverImage, setCoverImage] = useState(null)
    const [profileImage, setProfileImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [dob, setDob] = useState('')
    const [description, setDescription] = useState('')
    const [interest, setInterests] = useState("")
    const [profileData, setProfileData] = useState('')
    const [interestArray, setInterestArray] = useState([])
    const [defaultUserImage, setDefaultUserImage] = useState(null)
    const [defaultUserCoverImage, setDefaultUserCoverImage] = useState(null)
    const [datePicker, setDatePicker] = useState(false);
    const [allInterestList, setAllInterestList] = useState('')

    useEffect(() => {
        if (isSignedIn) {
            Get_Profile()
        }
        InterestListFromAPI()
    }, [])
    const Get_Profile = async () => {

        setLoading(true)
        try {
            const response = await GetProfileAPI()
             // console.log(" Get Profile Response ==>>>", response?.data?.user?.name);
            if (response.data.status == 200) {
                setName(response?.data?.user?.name)
                setDob(response?.data?.user?.dob)
                setCity(response?.data?.user?.city)
                setCountry(response?.data?.user?.country)
                setDescription(response?.data?.user?.description)
                setDefaultUserImage(response?.data?.user?.main_image)
                setDefaultUserCoverImage(response?.data?.user?.bg_image)
                setInterests(response?.data?.user?.interests[0]?.name)
                setProfileImage(response?.data?.user?.main_image)
                setCoverImage(response?.data?.user?.bg_image)

            }
        } catch (error) {
            console.log("GetProfileAPI-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }
    const InterestListFromAPI = async () => {
        try {
            const response = await Get_Interests_API()
            // console.log("Get_Interests_API ===>>>>", response?.data?.interests);
            if (response.data.status == 200) {
                setAllInterestList(response?.data?.interests)
            }
        } catch (error) {
            console.log("Get_Interests_API-error===>>>", error);
        }
    }

    const edit_profile = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('background_image', coverImage)
            formData.append('main_image', profileImage)
            formData.append('city', city)
            formData.append('country', country)
            formData.append('description', description)
            formData.append('dob', dob)
            interestArray.forEach((element, index) => {
                formData.append(`interest[]`, element?.name)
            });
            console.log('formData-response===>>>', formData?._parts)
            const response = await Update_Profile_API(formData)
            console.log("Update_Profile_API ==>>>", response.data);
            if (response.data.status == 200) {
                navigation.goBack()
            }
            else if (response.data.status == 202) {
                Toast.show(response?.data?.message)
            }
        } catch (error) {
            console.log("Update_Profile_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }

    const options = {
        opacity: 0.3,
        mediaType: 'photo',
        videoQuality: 'low',
        quality: 0.1,

    }

    const showCamera = () => {
        launchCamera(options, callback);
    }
    const showLibrary = () => {
        launchImageLibrary(options, callback)
    }

    const callback = async response => {
        if (response.didCancel) {
            console.log("User Cancelled Image Picker")
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
            if (isImage) {
                console.log("isImage==>", isImage);
                setProfileImage(source)
                console.log("source Image ===>>>", source);
            }
            else {
                setCoverImage(source)
            }
        }
    }
    const handleConfirm = (date) => {
        setDatePicker(false);
        console.warn("A date has been picked: ", date);
        let strDate = moment(date).format('DD/MM/YYYY')
        setDob(strDate)
    };
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setInterestArray(interestArray.filter((filter) => {
                        return filter.id != item?.id
                    }
                    ))
                }}
                style={profileSetupStyles.interestContainer}>
                <Text style={profileSetupStyles.interestTags}>
                    {item?.name}</Text>
                <TouchableOpacity
                    onPress={() => {
                        setInterestArray(interestArray.filter((filter) => {
                            return filter.id != item?.id
                        }
                        ))
                    }}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image source={Icons.Close} style={{ width: 10, height: 10, resizeMode: 'contain', tintColor: colors.whiteGray }} />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={profileSetupStyles.mainContainer}>
            <Header
                label={'Edit Profile'}
                onBackPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <View style={profileSetupStyles.innerContainer}>
                    {/* {coverImage  ?
                        <Image
                            source={coverImage ? coverImage : { uri: IMAGE_URL + defaultUserCoverImage }}
                            style={profileSetupStyles.coverImage}
                        />
                    :null} */}
                    {(coverImage === null && defaultUserCoverImage === null) ?
                        <Image
                            style={profileSetupStyles.coverImage}
                            // source={  { uri: IMAGE_URL + profileImage } || profileImage}/>
                            source={Images.coverImage} /> :
                        <Image
                            source={coverImage ? coverImage : { uri: IMAGE_URL + defaultUserCoverImage }}
                            style={profileSetupStyles.coverImage}
                        />}
                    <TouchableOpacity style={profileSetupStyles.ccam}
                        onPress={() => {
                            setIsImage(false)
                            setShowModal(true)
                        }}
                    >
                        <Image source={Icons.camera} style={{ width: 20, height: 15 }} />
                    </TouchableOpacity>

                </View>
                <View style={profileSetupStyles.profileImage}>
                    <Image
                        style={{ width: 100, height: '100%', resizeMode: 'cover', borderRadius: 100 }}
                        source={profileImage ? profileImage : { uri: IMAGE_URL + defaultUserImage }} />
                    {/* {(profileImage === null && defaultUserImage === null) ?
                        <Image
                            style={{ width: 100, height: '100%', resizeMode: 'cover', borderRadius: 100 }}
                            source={Images.profileImage} />
                        :
                        <Image
                            style={{ width: 100, height: '100%', resizeMode: 'cover', borderRadius: 100 }}
                            source={profileImage ? profileImage : { uri: IMAGE_URL + defaultUserImage }} />} */}
                    <TouchableOpacity style={profileSetupStyles.pcam}
                        onPress={() => {
                            setIsImage(true)
                            setShowModal(true)
                        }}
                    >
                        <Image source={Icons.camera} style={{ width: 20, height: 15 }} />
                    </TouchableOpacity>
                </View>
                <Text style={profileSetupStyles.TextHeading}>{profileData?.name}</Text>
                <Text style={[profileSetupStyles.TextGray, { textAlign: 'center' }]}>{profileData?.country}</Text>
                <View style={{ paddingHorizontal: '5%', paddingVertical: '5%' }}>
                    <AppTextInput
                        title={'Full Name'}
                        placeholder={'Enter Name'}
                        icon={Icons.profileIcon}
                        mainContainer={profileSetupStyles.editText}
                        onChangeText={(text) => setName(text)}
                        value={name}
                    />
                    <AppTextInput
                        title={'Email'}
                        placeholder={email}
                        icon={Icons.mailIcon}
                        mainContainer={profileSetupStyles.editText}
                        editable={false}


                    />
                    <AppTextInput
                        title={'Date of Birth'}
                        placeholder={'Enter DOB'}
                        icon={Icons.date}
                        onIconPress={() => setDatePicker(true)}
                        mainContainer={profileSetupStyles.editText}
                        onChangeText={(text) => setDob(text)}
                        value={dob}
                        editable={false}
                    />
                    <AppTextInput
                        title={'City'}
                        placeholder={"City"}
                        icon={Icons.date}
                        mainContainer={profileSetupStyles.editText}
                        onChangeText={(text) => setCity(text)}
                        value={city}
                    />
                    <AppTextInput
                        title={'Country'}
                        placeholder={'Country'}
                        icon={Icons.date}
                        mainContainer={profileSetupStyles.editText}
                        onChangeText={(text) => setCountry(text)}
                        value={country}
                    /> 
                   {allInterestList.length > 0 ?
                    < Picker
                        title="Choose Interest"
                        placeholder="Choose Interest"
                        icon={Icons.interests}
                        list={allInterestList}
                        mainContainer={{ marginTop: 30 }}
                        selectedItem={(value) => {
                            let tempArray = [...interestArray]
                            tempArray?.push(value)
                            setInterestArray(tempArray)
                        }}
                    /> : null}
                    <FlatList
                        numColumns={2}
                        columnWrapperStyle={{
                            flex: 1,
                            justifyContent: "flex-start"
                        }}
                        data={interestArray}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={{ paddingHorizontal: 20 }}
                    />
                    <AppTextInput
                        title={'Bio'}
                        placeholder={"Description"}
                        icon={Icons.description}
                        mainContainer={profileSetupStyles.editText}
                        inputConatiner={profileSetupStyles.inputConatiner}
                        onChangeText={(text) => setDescription(text)}
                        value={description}
                    />
                    <AppButton
                        label={'Save'}
                        mainContainer={profileSetupStyles.button}
                        labelStyle={profileSetupStyles.labelStyle}
                        onPress={() => edit_profile()} />
                </View>
                <View style={{ marginBottom: 20 }}></View>
                <CustomModal
                    isVisible={showModal}
                    onCamerPress={() => showCamera()}
                    onLibraryPress={() => showLibrary()}
                    onCancelPress={() => setShowModal(false)}
                />
            </KeyboardAwareScrollView>
            <DateTimePickerModal
                isVisible={datePicker}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePicker(false)}
            />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default EditProfile;
