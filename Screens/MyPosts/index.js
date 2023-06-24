import React, { useRef, useState, useEffect } from 'react'
import {
    SafeAreaView,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Text
} from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
import { useIsFocused } from '@react-navigation/native'
import Toast from 'react-native-simple-toast'
// Files
import postStyles from './postStyles'
import Images from '../../assets/images/images';
import Logos from '../../assets/logos/logos';
import colors from '../../assets/colors';
import Header from '../../Components/Header'
import PostCard from '../../Components/PostCard';
import RoundButton from '../../Components/RoundButton';
import Icons from '../../assets/icons/icons';

//Api
import { My_All_POlls_API, Delete_Poll_API } from '../../API/Methods/auth';

const MyPosts = ({ navigation }) => {
    const isFocused = useIsFocused()
    const [pollData, setPollData] = useState('')
    const [loading, setLoading] = useState(false)
    const [selectedPollId, setSelectedPollId] = useState('')
    const refRBSheet = useRef();

    const Data = [
        {
            id: '1',
            name: "Alexendra",
            post1: Images.userPoll1,
            post2: Images.userPoll2,
            post1Vote: 100,
            post2Vote: 50,
            isExpired: false
        },
        {
            id: '2',
            name: "Amelia",
            post1: Images.userPoll3,
            post2: Images.userPoll4,
            post1Vote: 100,
            post2Vote: 50,
            isExpired: true
        },
    ]

    useEffect(() => {
        getMyPolls()
    }, [isFocused])

  
    const getMyPolls = async () => {
        setLoading(true)
        try {
            const response = await My_All_POlls_API()
            console.log("MY POLLS DATA ==>>", response.data);
            if (response?.data?.status == 200) {
                setPollData(response?.data?.polls)
            }
           else if (response?.data?.status == 204) {
                Toast.show(response.data.message)
            }
        } catch (error) {
            console.log("My_All_POlls_API-error===>>>", error);
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
            console.log("FormData ==>>", formData);
            const response = await Delete_Poll_API(formData)
            console.log("response delete API", response?.data);
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
    const renderItem = ({ item }) => {
        return (
            <PostCard
                item={item}
                navigation={navigation}

                onPressMenu={() => {
                    setSelectedPollId(item?.id)
                    refRBSheet.current.open()
                }}
            />
        )
    }
    return (
        <SafeAreaView style={postStyles.mainContainer}>
            <Header
                label={'My Posts'}
                onMenuPress={() => navigation.openDrawer()}
                onNotificationPress={() => navigation.navigate('Notification')}
            />
            <View style={postStyles.innerContainer}>
                <FlatList
                    data={pollData}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
            </View>
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
                <View style={postStyles.bottomsheetInnerContainer}>
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
                            // navigation.navigate('FriendsProfile'),
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
                            DeletePollAPI()
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
        </SafeAreaView>
    )
}

export default MyPosts;
