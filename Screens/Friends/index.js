// General Imports
import React, { useState, useRef, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import { useSelector } from 'react-redux';
import Toast from 'react-native-simple-toast'
import { useIsFocused } from '@react-navigation/native';
// Files
import friendStyles from './friendStyles';
import Icons from '../../assets/icons/icons';
import Images from '../../assets/images/images';
import Logos from '../../assets/logos/logos'

// Components
import AuthHeader from '../../Components/AuthHeader';
import AppTextInput from '../../Components/AppTextInput';
import colors from '../../assets/colors';
import Loader from '../../Components/Loader';

//API
import { Friend_List_API } from '../../API/Methods/auth';
import { IMAGE_URL } from '../../API/config';

const Friends = ({ navigation, route }) => {

    const refRBSheet = useRef();
    const { id } = useSelector(state => state.userSession)
    const isFocused = useIsFocused()

    useEffect(() => {
        friendListAPI()
    }, [isFocused])

    const [showSearch, setShowSearch] = useState(false)
    const [searchFriend, setSearchFriend] = useState('')
    const [loading, setLoading] = useState(false)
    const [nofriend, setNofriend] = useState('')
    const [friendData, setFriendData] = useState('')
    const [friendItem, setFriendItem] = useState('')


    const friendListAPI = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('user_id', id)
            console.log('formData-response===>>>', formData)
            const response = await Friend_List_API(formData)
            if (response.data.status == 200) {
                setFriendData(response.data?.friend_lists)
            }
            else if (response.data.status == 204) {
                Toast.show(response.data.message)
                setNofriend(response.data.message)
            }
        } catch (error) {
            console.log("Friend_List_API-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View style={friendStyles.flatListContainer}>
                {
                    friendData.length == 0 ?
                        <View style={{
                            justifyContent: 'center',
                            alignItems: "center",
                            width: "100%",
                            marginTop: '30%',
                        }}>
                            <Text style={{ color: colors.appPink, fontSize: 20 }}>
                                {'No friend found'}
                            </Text>
                        </View>
                        :
                        <>
                            <View style={friendStyles.flatListInfoContainer}>
                                <Image
                                    style={{ width: 55, height: 55, borderRadius: 100 }}
                                    resizeMode="contain"
                                    source={{uri: IMAGE_URL + item?.main_image}}
                                />
                                <Text style={friendStyles.friendNameText}>{item?.name}</Text>
                            </View>
                            <TouchableOpacity
                                style={friendStyles.menuButton}
                                onPress={() => {
                                    setFriendItem(item)
                                    refRBSheet.current.open()
                                }}
                            // onPress={() => alert(item?.id)}
                            >
                                <Image
                                    source={Icons.threeDotIcon}
                                    style={{ width: 25, height: 25 }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </>
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={friendStyles.mainContainer}>
            <AuthHeader
                label="My Friends"
                rightIcon={Icons.searchIcon}
                onRighIconPress={() => setShowSearch(!showSearch)}
                onBackPress={() => navigation.goBack()}
            />
            <View style={friendStyles.innerContainer}>
                {showSearch ? <AppTextInput
                    placeholder="Search Friend"
                    value={searchFriend}
                    onChangeText={(text) => {
                        // let newList = [...filteredList]
                        // if (text?.length > 0) {
                        //     newList = newList?.filter((item) => {
                        //         item?.name?.toLowerCase()

                        //     })
                        // }
                        // setFilteredList(newList)
                        setSearchFriend(text)
                    }}
                /> : null}
                <TouchableOpacity style={friendStyles.requestRowContainer} onPress={() => navigation.navigate('FriendRequest')}>
                    <View style={friendStyles.imageContainer}>
                        <Image
                            source={Images.requestPersonImage}
                            style={{ width: "100%", height: "100%", borderRadius: 100 }}
                            resizeMode="contain"
                        />
                    </View>
                    <View style={friendStyles.requestRightContainer}>
                        <Text style={friendStyles.requestHeadingText}>{"Friend Requests"}</Text>
                        <Text style={friendStyles.requestSubheadingText}>{"Accept or Ignore the Requests"}</Text>
                    </View>
                </TouchableOpacity>
                <Text style={friendStyles.flatListHeading}>{"Friends"}</Text>
                <FlatList
                    data={friendData}
                    renderItem={renderItem}
                    keyExtractor={item => item?.id}
                />
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
                    <View style={friendStyles.bottomsheetInnerContainer}>
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
                            width: "50%",
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                            onPress={() => {
                                navigation.navigate('FriendsProfile',{FriendItem:friendItem}),
                                    refRBSheet.current.close()
                            }}
                        >
                            <Image
                                source={Logos.Preview}
                                style={{ width: 18, height: 18 }}

                            />
                            <Text style={{ color: colors.black }}>
                                {'View User Profile'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            height: 40,
                            width: "27%",
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                            onPress={() => {
                                navigation.navigate('ReportProblem'),
                                    refRBSheet.current.close()
                            }}
                        >
                            <Image
                                source={Logos.Flag}
                                style={{ width: 18, height: 18 }}

                            />
                            <Text style={{ color: colors.black }}>
                                {'Report'}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            height: 40,
                            width: "24%",
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }} >
                            <Image
                                source={Logos.Block}
                                style={{ width: 18, height: 18 }}

                            />
                            <Text style={{ color: colors.black }}>
                                {'Block'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </RBSheet>
            </View >
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView >
    )
}

export default Friends;