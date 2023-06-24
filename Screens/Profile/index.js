import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Image,
    FlatList
} from 'react-native';


// Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native'
// Files 
import Images from '../../assets/images/images';
import Icons from '../../assets/icons/icons';
import profileStyles from './profileStyles';
import colors from '../../assets/colors';

// Components
import AppButton from '../../Components/AppButton';
import AuthHeader from '../../Components/AuthHeader';
import TextView from '../../Components/TextView';
import Loader from '../../Components/Loader'

//API
import { GetProfileAPI } from '../../API/Methods/auth'
import { IMAGE_URL } from '../../API/config';

const Profile = ({ navigation }) => {
    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(false)
    const [profileData, setProfileData] = useState('')

    useEffect(() => {
        Get_Profile()
    }, [isFocused])
    const Get_Profile = async () => {

        setLoading(true)
        try {
            const response = await GetProfileAPI()
            console.log("GetProfileAPI ===>>>", response.data?.user?.interests);
            if(response.data.status == 200){
                setProfileData(response?.data?.user)
            }
        } catch (error) {
            console.log("SignUpApi-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }
    const renderItem = ({ item }) => {
        return (
            <View style={profileStyles.interestContainer}>
                <Text style={profileStyles.interestTags}>
                    {item?.name}</Text>
            </View>
        )
    }
    return (
        <SafeAreaView style={profileStyles.mainContainer}>
            <AuthHeader
                label={"Profile"}
                onBackPress={() => navigation.goBack()}
            />
            <View style={profileStyles.innerContainer}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <Image
                        source={{uri: IMAGE_URL+profileData?.bg_image}}
                        style={profileStyles.coverImage}
                    />
                    <View style={profileStyles.profileImage}>
                        <Image
                            style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 100 }}
                            source={{uri: IMAGE_URL+profileData?.main_image}} />
                    </View>
                    <Text style={profileStyles.TextHeading}>{profileData?.name}</Text>
                    <Text style={profileStyles.TextGray}>{profileData?.city}</Text>
                    <Text style={profileStyles.profileDescription}>{profileData?.description}</Text>
                    <View style={profileStyles.flexRowButton}>
                        <AppButton
                            label={'Edit Profile'}
                            mainContainer={profileStyles.button}
                            labelStyle={profileStyles.labelStyle}
                            onPress={() => navigation.navigate('EditProfile')}
                        />
                        <AppButton
                            label={'Change Password'}
                            mainContainer={profileStyles.button}
                            labelStyle={profileStyles.labelStyle}
                            onPress={() => navigation.navigate("ChangePassword")}
                        />
                    </View>
                    <TextView
                        icon={Icons.date}
                        Title={'Date of Birth'}
                        date={profileData?.dob} />
                    <TextView
                        icon={Icons.country}
                        Title={"Country"}
                        date={profileData?.country} />
                        
                    <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '5%', marginTop: '5%' }}>
                        <Image
                            source={Icons.interests}
                            style={{ width: 18, height: 18, resizeMode: 'center' }} />
                        <Text style={{ paddingLeft: '3%', color: colors.black }}>Interests</Text>
                    </View>
                    <FlatList
                        numColumns={3}
                        columnWrapperStyle={profileStyles.row}
                        data={profileData?.interests}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={{ paddingHorizontal: 20 }}
                    />
                    <View style={{ marginBottom: 20 }}></View>
                </KeyboardAwareScrollView>
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default Profile