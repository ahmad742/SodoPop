import React, { useRef, useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    TouchableOpacity,
    Text,
    Image,
    Alert
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Toast from 'react-native-simple-toast';
import { useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';
// Files
import homeStyles from './homeStyles';
import Images from '../../assets/images/images';
import Logos from '../../assets/logos/logos';
import Icons from '../../assets/icons/icons';
import colors from '../../assets/colors';

// Components
import Header from '../../Components/Header'
import PostCard from '../../Components/PostCard';
import RoundButton from '../../Components/RoundButton';
import AppTextInput from '../../Components/AppTextInput';
import Loader from '../../Components/Loader';

//API
import { Search_Friend_API, All_POlls_API, Delete_Poll_API } from '../../API/Methods/auth'
import { IMAGE_URL } from '../../API/config';

const Home = ({ navigation }) => {
    const isFocused = useIsFocused()
    const refRBSheet = useRef();
    const { isGuestUser, id } = useSelector(state => state.userSession)
    const [showSearch, setShowSearch] = useState(false)
    const [searchFriend, setSearchFriend] = useState('')
    const [searchData, setSearchData] = useState('')
    const [loading, setLoading] = useState(false)
    const [pollData, setPollData] = useState('')
    const [selectedPollId, setSelectedPollId] = useState('')
    const [pollUserId, setPollUserId] = useState("")

    useEffect(() => {
        getALlPolls()
    }, [isFocused])
    const getALlPolls = async () => {
        setLoading(true)
        try {
            const response = await All_POlls_API()
            if (response?.data?.status == 200) {
                setPollData(response?.data?.polls)
            }
        } catch (error) {
            console.log("All_POlls_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }
    const DeletePollAPI = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('poll_id', selectedPollId)
            const response = await Delete_Poll_API(formData)
            if (response.data.status == 200) {
                Toast.show(response?.data?.message)
                getALlPolls()
            }
            else if (response.data.status == 204) {
                Toast.show(response?.data?.message)
            }
        } catch (error) {
            console.log("Delete_Poll_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }
    const searchFriendAPI = async (text) => {
        try {
            const formData = new FormData()
            formData.append('keyword', text)
            const response = await Search_Friend_API(formData)
            if (response.data.status == 200) {
                setSearchData(response.data?.users)
            }
        } catch (error) {
            console.log("Search_Friend_API-error===>>>", error);
        }
    }
    const renderItem = ({ item }) => {
        return (
                <PostCard
                    item={item}
                    navigation={navigation}
                    onPressMenu={() => {
                        setSelectedPollId(item?.id)
                        setPollUserId(item?.user_id)
                        refRBSheet.current.open()
                    }}
                />
        )
    }
    const SearchFriendRenderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    isGuestUser == true ?
                        alert("Please login first to perform any activity")
                        :
                        navigation.navigate('FriendsProfile', { FriendData: item })
                    setShowSearch(!showSearch)
                }
                }
                style={homeStyles.flatListContainer}>
                <View style={homeStyles.flatListInfoContainer}>
                    <Image
                        style={{ width: 55, height: 55, borderRadius: 100 }}
                        resizeMode="stretch"
                        source={{ uri: IMAGE_URL + item?.main_image }}
                    />
                    <Text style={homeStyles.friendNameText}>{item?.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    {item.request === 'ComingRequest' ?
                        <>
                            <AppButton
                                label={'Accept'}
                                mainContainer={homeStyles.buttonAccept}
                                labelStyle={homeStyles.labelStylea} />
                            <AppButton
                                label={'Ignore'}
                                mainContainer={homeStyles.buttonIgnore}
                                labelStyle={{ color: colors.appPink, fontSize: 12, }} />
                        </>
                        : null}
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
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={homeStyles.mainContainer}>
            <Header
                label={'News Feed'}
                onMenuPress={() => navigation.openDrawer()}
                onNotificationPress={() => {
                    isGuestUser == true ?
                        Alert.alert(
                            "Alert Title",
                            "Please login first to perform any activity",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "Login", onPress: () => navigation.dispatch(StackActions.replace("AuthStack")) }
                            ]
                        )
                        :
                        navigation.navigate('Notification')
                }
                }
                onSearchhPress={() => setShowSearch(!showSearch)}
            />
            {showSearch ?
                <AppTextInput
                    placeholder="Search Friend"
                    value={searchFriend}
                    onChangeText={(text) => {
                        setSearchFriend(text)
                        searchFriendAPI(text)
                    }}
                /> : null}
            {showSearch ?
                <FlatList
                    data={searchData}
                    keyExtractor={item => item.id}
                    renderItem={SearchFriendRenderItem}
                />
                :
                <View style={homeStyles.innerContainer}>
                    <FlatList
                        data={pollData}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    // inverted
                    />
                </View>
            }
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
                <View style={homeStyles.bottomsheetInnerContainer}>
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
                    {
                        id === pollUserId &&
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            height: 40,
                            width: "21%",
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                            onPress={() => {
                                {
                                    isGuestUser ?
                                        Alert.alert(
                                            "Alert Title",
                                            "Please login first to perform any activity",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                { text: "Login", onPress: () => navigation.dispatch(StackActions.replace("AuthStack")) }
                                            ]
                                        )
                                        :
                                        navigation.navigate('EditProfile')
                                }
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
                    }
                    {
                        id === pollUserId &&
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            height: 40,
                            width: "26%",
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                            onPress={() => {
                                {
                                    isGuestUser ?
                                        Alert.alert(
                                            "Alert Title",
                                            "Please login first to perform any activity",
                                            [
                                                {
                                                    text: "Cancel",
                                                    onPress: () => console.log("Cancel Pressed"),
                                                    style: "cancel"
                                                },
                                                { text: "Login", onPress: () => navigation.dispatch(StackActions.replace("AuthStack")) }
                                            ]
                                        )
                                        :
                                        DeletePollAPI()
                                }
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
                    }
                    <TouchableOpacity
                        onPress={() => {
                            {
                                isGuestUser ?
                                    Alert.alert(
                                        "Alert Title",
                                        "Please login first to perform any activity",
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: () => console.log("Cancel Pressed"),
                                                style: "cancel"
                                            },
                                            { text: "Login", onPress: () => navigation.dispatch(StackActions.replace("AuthStack")) }
                                        ]
                                    )
                                    :
                                    navigation.navigate('ReportProblem', { PollData: selectedPollId })
                            }
                            refRBSheet.current.close()

                        }}
                        style={{
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
            <RoundButton mainContainer={homeStyles.roundButtonContainer}
                onPress={() => {
                    isGuestUser ?
                        Alert.alert(
                            "Alert Title",
                            "Please login first to perform any activity",
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => console.log("Cancel Pressed"),
                                    style: "cancel"
                                },
                                { text: "Login", onPress: () => navigation.dispatch(StackActions.replace("AuthStack")) }
                            ]
                        )
                        :
                        navigation.navigate("CreatePoll")
                }} />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default Home;
