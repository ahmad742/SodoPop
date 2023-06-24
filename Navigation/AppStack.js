// General react imports
import React from "react";

// Libraries
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from "react-redux";

// Screens
import ChangePassword from "../Screens/ChangePassword";

// Drawer Scrceens
import Profile from "../Screens/Profile";
import MyPosts from "../Screens/MyPosts";
import ContactUs from "../Screens/ContactUs";

// HomeStack Screens
import Home from "../Screens/Home";
import CreatePoll from "../Screens/CreatePoll";
import Notification from "../Screens/Notification";
// FriendScreeenStack
import Friends from "../Screens/Friends";
import FriendRequest from "../Screens/FriendRequest";
import FriendsProfile from "../Screens/FriendsProfile";
import ReportProblem from "../Screens/ReportProblem";

// ProfileStack Screens
import EditProfile from "../Screens/EditProfile";

// Components
import DrawerComponent from "../Components/DrawerComponent";

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator()
const FriendStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()

// HomeStack
const HomeScreenStack = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }} initialRouteName="Home">
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="CreatePoll" component={CreatePoll} />
            <HomeStack.Screen name="Notification" component={Notification} />

        </HomeStack.Navigator>
    )
}

// FriendScreenStack
const FriendScreenStack = () => {
    return (
        <FriendStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Friends"
        >
            <FriendStack.Screen name="Friends" component={Friends} />
            <FriendStack.Screen name="FriendRequest" component={FriendRequest} />
            <FriendStack.Screen name="FriendsProfile" component={FriendsProfile} />
            <FriendStack.Screen name="ReportProblem" component={ReportProblem} />
        </FriendStack.Navigator>
    )
}

const ProfileScreenStack = () => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Profile"
        >
            <ProfileStack.Screen name="Profile" component={Profile} />
            <ProfileStack.Screen name="EditProfile" component={EditProfile} />
        </ProfileStack.Navigator>
    )
}

// Drawer Stack
const DrawerStack = () => {
    return (
        <Drawer.Navigator initialRouteName="HomeScreenStack"
            drawerContent={(props) => <DrawerComponent {...props} />}
        >
            <Drawer.Screen name="HomeScreenStack" component={HomeScreenStack} />
            <Drawer.Screen name="ProfileScreenStack" component={ProfileScreenStack} />
            <Drawer.Screen name="MyPosts" component={MyPosts} />
            <Drawer.Screen name="ContactUs" component={ContactUs} />
            <Drawer.Screen name="FriendScreenStack" component={FriendScreenStack} />
        </Drawer.Navigator>
    )
}

const AppStack = () => {

    const { isSignedIn } = useSelector(state => state.userSession)
    console.log("isSiugned in  ==== >>>>", isSignedIn);
    return (
        <Stack.Navigator 
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={"DrawerStack"}
        >
            <Stack.Screen name="DrawerStack" component={DrawerStack} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <FriendStack.Screen name="FriendsProfile" component={FriendsProfile} />
            <FriendStack.Screen name="ReportProblem" component={ReportProblem} />


        </Stack.Navigator>
    )
}

export default AppStack;