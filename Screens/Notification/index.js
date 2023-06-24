import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    Image
} from 'react-native'
import React from 'react'
import Header from '../../Components/AuthHeader'
//Files Import
import notificationStyle from './notificationStyle'
import Images from '../../assets/images/images'
import AppButton from '../../Components/AppButton'
import colors from '../../assets/colors'
const Notification = ({ navigation }) => {
    const data = [
        {
            id: "1",
            title: 'Boris Dyer has sent you',
            description: '19 hours ago',
            request: 'yes'
        },
        {
            id: "2",
            title: 'Andrea has added new Event',
            description: '19 hours ago',
            request: 'no'
        },
        {
            id: "3",
            title: 'Thomas Nash has commented on your Poll',
            description: '19 hours ago',
            request: 'no'
        },
        {
            id: "4",
            title: 'Bernadette has commented on your Poll',
            description: '19 hours ago',
            request: 'yes'
        },
        {
            id: "5",
            title: 'Caroline has commented on your Poll',
            description: '19 hours ago',
            request: 'no'
        },
    ]


    const renderItem = ({ item }) => {
        return (

            <View style={notificationStyle.flatView}>
                <Image
                    source={Images.profileImage}
                    style={notificationStyle.flatImage}
                    resizeMode='contain' />
                <View
                    style={{
                        width: item.request == 'yes' ? '45%' : '80%',
                        justifyContent: 'space-between'
                    }}>
                    <View style={{ flexDirection: 'row', }}>
                        <Text
                            numberOfLines={1}
                            style={notificationStyle.title}>
                            {item.title}
                        </Text>
                        {item.request === 'yes' ?
                            <View style={{ flexDirection: 'row', width: '75%', justifyContent: 'flex-end' }}>
                                <AppButton
                                    label={'Accept'}
                                    mainContainer={notificationStyle.buttonAccept}
                                    labelStyle={notificationStyle.labelStylea} />
                                <AppButton
                                    label={'Ignore'}
                                    mainContainer={notificationStyle.buttonIgnore}
                                    labelStyle={notificationStyle.labelStyle} />
                            </View>
                            : null}

                    </View>
                    <Text style={[notificationStyle.description,{color:item.request == 'yes' ? colors.appPink:colors.LightGray}]}>
                        {item.description}
                    </Text>
                </View>
            </View>



        )
    }
    return (
        <SafeAreaView>
            <Header
                label={'Notifications'}
                onBackPress={() => navigation.goBack()}
            />
            <View style={notificationStyle.innerContainer}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </View>
        </SafeAreaView>
    )
}

export default Notification

const styles = StyleSheet.create({})