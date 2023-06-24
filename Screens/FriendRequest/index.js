import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import  Toast  from 'react-native-simple-toast';
// Files
import Icons from '../../assets/icons/icons';
import Images from '../../assets/images/images';
import requestStyles from './requestStyles'
// Components
import AuthHeader from '../../Components/AuthHeader';
import AppTextInput from '../../Components/AppTextInput';
import AppButton from '../../Components/AppButton';
import Loader from '../../Components/Loader'

//API
import {All_Request_List_API, Accept_Ignore_API} from '../../API/Methods/auth'
import { IMAGE_URL } from '../../API/config';

const FriendRequest = ({navigation}) => {

  const { id } = useSelector(state => state.userSession)
  const isFocused = useIsFocused()

  useEffect(()=>{
    showAllRequests()
},[isFocused])
  const data = [
    {
      id: '1',
      name: "James Welsh",
      image: Images.userPoll1
    },
    {
      id: '2',
      name: "Boris Dyer",
      image: Images.userPoll2
    },
    {
      id: '3',
      name: "James Welsh",
      image: Images.userPoll3
    },
    {
      id: '4',
      name: "Cameron	Anderson",
      image: Images.userPoll4
    },
    {
      id: '5',
      name: "James Welsh",
      image: Images.userPoll1
    },
    {
      id: '6',
      name: "Cameron	Anderson",
      image: Images.userPoll2
    },
    {
      id: '7',
      name: "Boris Dyer",
      image: Images.userPoll3
    },
    {
      id: '8',
      name: "James Welsh",
      image: Images.userPoll4
    },
    {
      id: '9',
      name: "James Welsh",
      image: Images.userPoll1
    },
    {
      id: '10',
      name: "James Welsh",
      image: Images.userPoll2
    },
  ]

  const [showSearch, setShowSearch] = useState(false)
  const [searchFriend, setSearchFriend] = useState('')
  const [allList, setAllList] = useState('')
  const [loading, setLoading] = useState(false)

  const showAllRequests = async () => {
    setLoading(true)
    try {
        const formData = new FormData()
        formData.append('user_id', id)
        console.log('formData-response===>>>', formData)
        const response = await All_Request_List_API(formData)
        console.log("All_Request_List_API ==>>>", response.data);
        if (response.data.status == 200) {
            setAllList(response.data?.requests)
        }
    } catch (error) {
        console.log("All_Request_List_API-error===>>>", error);
    }
    finally{
      setLoading(false)
    }
}
  const acceptIgnore = async (item,status) => {
    setLoading(true)
    try {
        const formData = new FormData()
        formData.append('sender_id', item?.sender_id)
        formData.append('receiver_id', id)
        formData.append('status', status)
        console.log('formData-response===>>>', formData)

        const response = await Accept_Ignore_API(formData)
        console.log("Accept_Ignore_API ==>>>", response.status);
        console.log("response.data.status ==>>>", response.data.status);

        if (response.data.status == 200) {
            setAllList(response.data?.requests)
        }
    } catch (error) {
        console.log("Accept_Ignore_API-error===>>>", error);
    }
    finally{
      setLoading(false)
    }
}


  const renderItem = ({ item }) => {
    return (
      <View style={requestStyles.flatListContainer}>
        <View style={requestStyles.flatListInfoContainer}>
          <Image
            style={{ width: 55, height: 55, borderRadius: 100 }}
            resizeMode="contain"
            source={{uri:IMAGE_URL + item?.sender_data?.main_image}}
          />
          <Text style={requestStyles.friendNameText}>{item?.sender_data?.name}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <AppButton
            label={'Accept'}
            mainContainer={requestStyles.buttonAccept}
            labelStyle={requestStyles.labelStylea}
            onPress={()=>acceptIgnore(item, 'accepted')}
            />
          <AppButton
            label={'Ignore'}
            mainContainer={requestStyles.buttonIgnore}
            labelStyle={requestStyles.labelStyle} 
            onPress={()=>acceptIgnore(item, 'rejected')}
            />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={requestStyles.mainContainer}>
      <AuthHeader
        label="Friend Requests"
        rightIcon={Icons.searchIcon}
        onRighIconPress={() => setShowSearch(!showSearch)}
        onBackPress={() => navigation.goBack()}
      />
      <View style={requestStyles.innerContainer}>
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
        <FlatList
        showsVerticalScrollIndicator={false}
          data={allList}
          renderItem={renderItem}
          keyExtractor={item => item?.id}
        />
      </View>
      <Loader loading={loading} isShowIndicator={true} />
    </SafeAreaView>
  )
}

export default FriendRequest;