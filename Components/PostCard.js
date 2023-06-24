import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Linking,
    Alert
} from 'react-native';
import { BASE_URL, IMAGE_URL, POLLS_URL } from '../API/config';
import Toast from 'react-native-simple-toast'
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import moment from 'moment'
// Files
import colors from '../assets/colors';
import Fonts from '../assets/fonts';
import Icons from '../assets/icons/icons';
import Images from '../assets/images/images';
import Poll from './Poll';

//API
import {
    Total_Votes_Of_Poll_API,
    Poll_End_Time_API,
    Like_Poll_API,
    Total_Likes_Of_Poll_API
}
    from '../API/Methods/auth';

const PostCard = (props) => {
    const { item, navigation } = props
    const isFocused = useIsFocused()
    const { isGuestUser } = useSelector(state => state.userSession)
    const [totalvotes, setTotalvotes] = useState('')
    const [endTime, setEndTime] = useState('')
    const [like, setLike] = useState(0)
    const [pollLikes, setPollLikes] = useState('')
    const [id, setId] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [isLike, setIslike] = useState(false)

    useEffect(() => {
        TotalVotes()
        TotalLikes()
    }, [isFocused])

    useEffect(() => {
        setDate(item?.created_at)
        setTime(date.split("T")[1])
        var TempTime = date?.split("T")[1]
        dateTime(TempTime?.split(".")[0])
    }, [date])
    const dateTime = async (data) => {
        await setTime(data)
    }
    const TotalVotes = async () => {
        try {
            const formData = new FormData()
            formData.append('poll_id', item?.id)
            // console.log(" TotalVotes form data response ===>>>", formData)
            const response = await Total_Votes_Of_Poll_API(formData)
            // console.log(" TotalVotes ===>>>", response?.data?.status)
            if (response.data.status == 200) {
                setTotalvotes(response.data?.totalVoteOfPoll)
            }
        } catch (error) {
            // console.log("Total_Votes_Of_Poll_API-error===>>>", error);
        }
    }
    const TotalLikes = async (id) => {
        try {
            const formData = new FormData()
            formData.append('poll_id', item?.id)
            formData.append('poll_file_id', id)
            // console.log(" Total Likes form data response ===>>>", formData)
            const response = await Total_Likes_Of_Poll_API(formData)
            // console.log(" Total_Likes_Of_Poll_API response ===>>>", response?.data?.status)
            if (response.data.status == 200) {
                setPollLikes(response.data?.totalLike)
            }
        } catch (error) {
            // console.log("Total_Likes_Of_Poll_API-error===>>>", error);
        }
    }
    const polltime = async () => {
        try {
            const formData = new FormData()
            formData.append('poll_id', item?.id)
            const response = await Poll_End_Time_API(formData)
            if (response.data.status == 200) {
                setEndTime(response.data?.endTime)
                TotalVotes()
            }
        } catch (error) {
            // console.log("Poll_End_Time_API-error===>>>", error);
        }
    }
    const likePOll = async (selectedItem) => {

        try {
            const formData = new FormData()
            formData.append('poll_id', selectedItem.post_id)
            formData.append('poll_file_id', selectedItem.id)
            const response = await Like_Poll_API(formData)
            if (response.data.status == 200) {
                TotalVotes()
                setId(selectedItem.id)
            }
        } catch (error) {
            // console.log("Poll_End_Time_API-error===>>>", error);
        }
    }
    const checkPollLike = (value) => {
        // console.log("Check like ==>>", value);
        setLike(value)
    }
    return (
        <View style={styles.mainContainer}>

            <View style={styles.rowContainer}>
                <View style={styles.userInfoContainer}>

                    <TouchableOpacity
                        style={styles.profileImageContainer}
                        onPress={() => {
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
                                navigation.navigate("FriendsProfile", { FromHomeScreen: item })
                        }
                        } >
                        <Image
                            source={{ uri: IMAGE_URL + item?.user?.main_image }}
                            resizeMode="contain"
                            style={{ width: "100%", height: "100%", borderRadius: 100 }}
                        />
                    </TouchableOpacity>
                    <View style={styles.userContainer}>
                        <Text style={styles.nameText}>{`${item?.user?.name} Created Poll`}</Text>
                        <Text style={styles.createdDateText}>{moment(date).format('YYYY/MM/DD') + "   " + time}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.menuContainer}
                    onPress={props.onPressMenu}
                >
                    <Image
                        source={Icons.threeDotIcon}
                        style={{ width: 20, height: 20 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.descriptionContainer}>
                {
                    item?.poll_hash_tags?.map((tag) => {
                        return (
                            <Text style={styles.descriptionText}>{"#" + tag?.hash_tag?.name}</Text>

                        )
                    })
                }
            </View>
            <View style={styles.pollRowContainer}>
                {
                    item?.poll_files?.map((pollimg) => {
                        // console.log("Poll Data ==>>>", pollimg);                 
                               // return false
                        return (
                            <Poll
                                onPress={() => {
                                    isGuestUser == true ?
                                        Alert.alert(
                                            "Alert Title",
                                            "Please login first to perform any activity",
                                            [
                                                {
                                                    text: "Cancel",
                                                    style: "cancel"
                                                },
                                                { text: "Login", onPress: () => navigation.dispatch(StackActions.replace("AuthStack")) }
                                            ]
                                        )
                                        :
                                        likePOll(pollimg),
                                        checkPollLike(pollimg?.id)
                                    setIslike(!isLike)
                                }
                                }
                                name={pollimg?.text}
                                source={{ uri: POLLS_URL + pollimg?.file }}
                                favorite={isGuestUser ? false : (pollimg?.likes).length == 0 ? false : true}
                                likes={pollimg?.likes_count}
                            />
                        )
                    })
                }
            </View>
            <View style={styles.bottomContainer}>
                {item?.status == 1 ?
                    <View style={styles.postStatusContainer}>
                        <Image
                            source={Icons.checkIcon}
                            style={{ width: 16, height: 13, marginRight: 5, marginTop: 1 }}
                            resizeMode="contain"
                        />
                        <Text style={styles.pollStatus}>{"Poll Ended"}</Text>
                    </View>
                    :
                    <Text style={[styles.pollStatus, { width: "70%" }]}>{"This poll will end in" + " " + item?.time}</Text>}
                <Text style={styles.votesText}>{"Votes " + totalvotes}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '65%', justifyContent: 'space-between' }}>
                <Text style={[styles.pollStatus, { marginLeft: 5 }]}>{"Related Posts"}</Text>
                <TouchableOpacity
                    onPress={() => Linking.openURL('https://www.google.com/')}
                >
                    <Text style={{ color: colors.placeholderColor, textDecorationLine: "underline", fontWeight: '700' }}>
                        {"  " + "https://" + 'www.google.com'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default PostCard

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        backgroundColor: colors.white,
        padding: 15,
        marginVertical: 10,
    },
    rowContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    userInfoContainer: {
        width: "80%",
        flexDirection: "row",
        alignItems: "center",
    },
    profileImageContainer: {
        borderRadius: 100,
        width: 64,
        height: 64
    },
    userContainer: {
        alignItems: 'flex-start'
    },
    nameText: {
        fontWeight: "400",
        color: colors.black,
        marginLeft: 15,
        fontSize: 18
    },
    createdDateText: {
        fontWeight: "400",
        marginLeft: 15,
        fontSize: 16,
        marginTop: 2,
        color: colors.placeholderColor,
    },
    menuContainer: {
        width: "20%",
        alignItems: 'flex-end',
        paddingTop: 10
    },
    descriptionContainer: {
        marginTop: 35,
        width: "100%",
    },
    descriptionText: {
        fontWeight: "400",
        color: colors.black,
        fontSize: 24
    },
    pollRowContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10
    },
    bottomContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 18,
        padding: 5,
    },
    pollStatus: {
        color: colors.appPink,
        fontSize: 16,
        fontWeight: "400",
    },
    votesText: {
        color: colors.black,
        fontSize: 16,
        fontWeight: "400"
    },
    postStatusContainer: {
        width: 150,
        flexDirection: "row"
    }

})