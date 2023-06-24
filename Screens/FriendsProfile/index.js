import React, { useState, useRef, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from 'react-native-simple-toast'

// Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';
// Files 
import Images from '../../assets/images/images';
import styles from './styles';
import Logos from '../../assets/logos/logos'
import Icons from '../../assets/icons/icons';
import colors from '../../assets/colors';

// Components
import AppButton from '../../Components/AppButton';
import AuthHeader from '../../Components/AuthHeader';
import PostCard from '../../Components/PostCard';
import AppTextInput from '../../Components/AppTextInput';

import { IMAGE_URL } from '../../API/config';
//API
import {
    Send_Friend_Request_API,
    Cancel_Send_Request_API,
    Friends_Poll_API,
    UnFriend_API
} from '../../API/Methods/auth'

const FriendsProfile = ({ navigation, route }) => {

    const { id } = useSelector(state => state.userSession)
    const FriendData = route?.params?.FriendData
    const FriendItem = route?.params?.FriendItem
    const FromHomeScreen = route?.params?.FromHomeScreen
    // console.log("user_id ==>>>", FromHomeScreen);
    const refRBSheet = useRef();

    const [showSearch, setShowSearch] = useState(false)
    const [searchFriend, setSearchFriend] = useState('')
    const [requestButton, setRequestButton] = useState('')
    const [requestId, setRequestId] = useState('')
    const [pollsData, setPollsData] = useState('')
    const [resMsg, setResMsg] = useState('')

    useEffect(() => {
        FriendsPoll()
    }, [])

    const sendRequest = async () => {
        try {
            const formData = new FormData()
            formData.append('receiver_id', FriendData?.id || FriendItem?.id || FromHomeScreen?.user?.id)
            formData.append('sender_id', id)
            console.log("formData==>>", formData);
            const response = await Send_Friend_Request_API(formData)
            console.log("Send_Friend_Request_API ==>>>", response.data);
            if (response.data.status == 200) {
                setRequestId(response.data?.data)
                Toast.show(response.data.message)
                setRequestButton(response.data.message)
            }
            else if (response.data.status == 204) {
                Toast.show(response.data.message)
                setRequestButton(response.data.message)
            }
        } catch (error) {
            Toast.show("Something went wrong")
            console.log("Send_Friend_Request_API-error===>>>", error);
        }
    }
    const unfriend = async () => {
        try {
            const formData = new FormData()
            formData.append('receiver_id', FriendData?.id || FriendItem?.id  || FromHomeScreen?.user?.id)
            formData.append('sender_id', id)
            console.log(" unfriend formData==>>", formData);
            const response = await UnFriend_API(formData)
            console.log("UnFriend_API ==>>>", response.data);
            if (response.data.status == 200) {
                Toast.show(response.data.message)
            }
            else if (response.data.status == 204) {
                Toast.show(response.data.message)
                setResMsg(response.data.message)
            }
        } catch (error) {
            Toast.show("Something went wrong")
            console.log("UnFriend_API-error===>>>", error);
        }
    }
    const cancelRequest = async () => {
        try {
            const formData = new FormData()
            formData.append('request_id', requestId?.id) 
            console.log("form data cancel id", formData);
            const response = await Cancel_Send_Request_API(formData)
            console.log("Cancel_Send_Request_API ==>>>", response.data);
            if (response.data.status == 200) {
                Toast.show(response.data.message)
                setRequestButton(response.data.message)
            }
            else if (response.data.status == 204) {
                Toast.show(response.data.message)
                setRequestButton(response.data.message)
            }
        } catch (error) {
            console.log("Cancel_Send_Request_API-error===>>>", error);
        }
    }
    const FriendsPoll = async () => {
        try {
            const formData = new FormData()
            formData.append('user_id', FriendData?.id || FriendItem?.id  || FromHomeScreen?.user?.id )
            console.log('formData-response===>>>', formData)

            const response = await Friends_Poll_API(formData)
            if (response.data.status == 200) {
                setPollsData(response.data?.polls)
            }
        } catch (error) {
            console.log("Friends_Poll_API-error===>>>", error);
        }
    }
    const SearchData = [
        {
            id: '1',
            name: "James Welsh",
            image: Images.userPoll1,
            request: 'AddFriend'
        },
        {
            id: '2',
            name: "Boris Dyer",
            image: Images.userPoll2,
            request: 'RequestSend'
        },
        {
            id: '3',
            name: "James Welsh",
            image: Images.userPoll3,
            request: 'ComingRequest'
        },
        {
            id: '4',
            name: "Cameron	Anderson",
            image: Images.userPoll4,
            request: 'ComingRequest',

        },
        {
            id: '5',
            name: "James Welsh",
            image: Images.userPoll1,
            request: 'RequestSend'

        },
        {
            id: '6',
            name: "Cameron	Anderson",
            image: Images.userPoll2,
            request: 'AddFriend'

        },
        {
            id: '7',
            name: "Boris Dyer",
            image: Images.userPoll3,
            request: 'AddFriend'

        },
        {
            id: '8',
            name: "James Welsh",
            image: Images.userPoll4,
            request: 'RequestSend'

        },
        {
            id: '9',
            name: "James Welsh",
            image: Images.userPoll1,
            request: 'AddFriend'

        },
        {
            id: '10',
            name: "James Welsh",
            image: Images.userPoll2,
            request: 'ComingRequest',

        },
    ]
    const interstRender = ({ item }) => {
        return (
            <Text style={styles.infoTxt}>{item?.name || 'No Interests'}</Text>
        )
    }
    const search = ({ item }) => {
        return (
            <View style={styles.flatListContainer}>
                <View style={styles.flatListInfoContainer}>
                    <Image
                        style={{ width: 55, height: 55, borderRadius: 100 }}
                        resizeMode="stretch"
                        source={item?.image}
                    />
                    <Text style={styles.friendNameText}>{item?.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    {item.request === 'ComingRequest' ?
                        <>
                            <AppButton
                                label={'Accept'}
                                mainContainer={styles.buttonAccept}
                                labelStyle={styles.labelStylea} />
                            <AppButton
                                label={'Ignore'}
                                mainContainer={styles.buttonIgnore}
                                labelStyle={{ color: colors.appPink, fontSize: 12, }} />
                        </>
                        : null
                    }
                    {item.request === 'AddFriend' ?
                        <AppButton
                            label={'Add Friend'}
                            mainContainer={{
                                width: 87,
                                height: 30,
                                backgroundColor: colors.appPink,
                                borderColor: colors.appPink,
                                marginLeft: 10
                            }}
                            labelStyle={{ color: colors.white, fontSize: 12, }} /> : null}
                    {item.request === 'RequestSend' ?
                        <AppButton
                            label={'Request Sent'}
                            mainContainer={{
                                width: 87,
                                height: 30,
                                backgroundColor: colors.appPink,
                                borderColor: colors.appPink,
                                marginLeft: 10
                            }}
                            labelStyle={{ color: colors.white, fontSize: 12, }} /> : null}
                </View>
            </View>
        )
    }
    const home = ({ item }) => {
        return (
            <PostCard
                item={item}
                navigation={navigation}
                onPressMenu={() => refRBSheet.current.open()}
            />
        )
    }
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AuthHeader
                label={"Friends Profile"}
                onBackPress={() => navigation.goBack()}
                rightIcon={Icons.searchIcon}
                onRighIconPress={() => setShowSearch(!showSearch)}
            />
            {showSearch ?
                <AppTextInput
                    placeholder="Search Friend"
                    value={searchFriend}
                    onChangeText={(text) => {
                        setSearchFriend(text)
                    }}
                /> : null}
            <View style={styles.innerContainer}>

                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {!showSearch ?
                        <>
                            <Image
                                source={{ uri: IMAGE_URL + (FriendData?.bg_image || FriendItem?.bg_image || FromHomeScreen?.user?.bg_image) }}
                                style={styles.coverImage}
                            />
                            <View style={styles.profileImage}>
                                <Image
                                    style={{ width: 100, height: 100, resizeMode: 'cover', borderRadius: 100 }}
                                    source={{ uri: IMAGE_URL + (FriendData?.main_image || FriendItem?.main_image || FromHomeScreen?.user?.main_image) }} />
                            </View>
                            <Text style={styles.TextHeading}>{FriendData?.name || FriendItem?.name || FromHomeScreen?.user?.name}</Text>
                            <Text style={styles.TextGray}>{FriendData?.country || FriendItem?.country || FromHomeScreen?.user?.country}</Text>
                            <Text style={styles.profileDescription}>{FriendData?.description || FriendItem?.description || FromHomeScreen?.user?.description}</Text>
                            <View style={styles.flexRowButton}>
                                {
                                    FriendItem ?
                                        <>
                                            {
                                                resMsg == 'You are not friend' ?
                                                    <AppButton
                                                        label={'Add Friend'}
                                                        mainContainer={styles.button}
                                                        labelStyle={styles.labelStyle}
                                                        onPress={() => sendRequest()}
                                                    />
                                                    :
                                                    <AppButton
                                                        label={'Friends'}
                                                        mainContainer={styles.cancelbutton}
                                                        labelStyle={styles.CancellabelStyle}
                                                        onPress={() => unfriend()}
                                                    />
                                            }
                                        </>
                                        :
                                        <>
                                            {
                                                (requestButton == 'You have already sended a friend request' || requestButton == 'Friend request has been sent') ?
                                                    <AppButton
                                                        label={'Cancel Request'}
                                                        mainContainer={styles.cancelbutton}
                                                        labelStyle={styles.CancellabelStyle}
                                                        onPress={() => cancelRequest()}
                                                    />
                                                    :

                                                    <AppButton
                                                        label={'Add Friend'}
                                                        mainContainer={styles.button}
                                                        labelStyle={styles.labelStyle}
                                                        onPress={() => sendRequest()}
                                                    />
                                            }
                                        </>
                                }


                                <TouchableOpacity style={styles.menuContainer}
                                // onPress={props.onPressMenu}
                                >
                                    <Image
                                        source={Icons.horizantledots}
                                        style={{ width: 20, height: 20 }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.userInfoView, { marginTop: 30 }]}>
                                <Image source={Logos.Home} style={{ width: 20, height: 20 }} />
                                <Text style={styles.infoTxt}>{' Lives In ' + (FriendData?.city || FriendItem?.city || FromHomeScreen?.user?.city)}</Text>
                            </View>
                            <View style={styles.userInfoView}>
                                <Image source={Logos.Interests} style={{ width: 20, height: 20 }} />
                                <FlatList
                                    data={FriendData?.interests || FriendItem?.interests || FromHomeScreen?.user?.interests}
                                    numColumns={3}
                                    renderItem={interstRender}
                                    keyExtractor={item => item?.id}
                                />
                            </View>
                            <View style={styles.userInfoView}>
                                <Image source={Logos.Group} style={{ width: 20, height: 20 }} />
                                <Text style={styles.infoTxt}>{`${FriendData?.receiver_count || FriendItem?.receiver_count || '0'}` + ' Friends'}</Text>
                            </View>
                            <View style={styles.innerContainer}>
                                <FlatList
                                    data={pollsData}
                                    keyExtractor={item => item.id}
                                    renderItem={home}
                                />
                            </View>
                        </> : null}
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            wrapper: {
                                backgroundColor: "rgba(0, 0, 0, 0.4)"
                            },
                            draggableIcon: {
                                backgroundColor: 'lightgrey'
                            }
                        }}
                    >
                        <View style={styles.bottomsheetInnerContainer}>
                            <TouchableOpacity style={{
                                width: "100%",
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}
                                onPress={() => {
                                    refRBSheet.current.close()
                                }}
                            >
                                <Image
                                    source={Icons.Close}
                                    style={{ width: 18, height: 18 }}

                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                height: 40,
                                width: "21%",
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                                onPress={() => {
                                    navigation.navigate('ProfileSetup'),
                                        refRBSheet.current.close()
                                }}
                            >
                                <Image
                                    source={Icons.Edit}
                                    style={{ width: 18, height: 18 }}

                                />
                                <Text style={{ color: colors.black }}>
                                    {'Edit'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                height: 40,
                                width: "26%",
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                                onPress={() => {
                                    // navigation.navigate('ReportProblem'),
                                    refRBSheet.current.close()
                                }}
                            >
                                <Image
                                    source={Icons.Delete}
                                    style={{ width: 16, height: 18 }}

                                />
                                <Text style={{ color: colors.black }}>
                                    {'Delete'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                height: 40,
                                width: "26%",
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }} >
                                <Image
                                    source={Logos.Flag}
                                    style={{ width: 18, height: 18 }}

                                />
                                <Text style={{ color: colors.black }}>
                                    {'Report'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </RBSheet>
                    {showSearch ?
                        <View style={styles.innerContainer}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={SearchData}
                                renderItem={search}
                                keyExtractor={item => item?.id}
                            />
                        </View> : null}
                    <View style={{ marginBottom: 20 }}></View>
                </KeyboardAwareScrollView>

            </View>
        </SafeAreaView>
    )
}

export default FriendsProfile