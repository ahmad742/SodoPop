// General react imports
import React from "react";

// Libraries
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import Landing from "../Screens/Landing";
import Login from '../Screens/Login';
import SignUp from "../Screens/SignUp";
import EmailVerification from "../Screens/EmailVerification";
import ForgotPassword from "../Screens/ForgotPassword";
import ChangePassword from "../Screens/ChangePassword";
import ProfileSetup from "../Screens/ProfileSetup";

const Stack = createNativeStackNavigator()

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Landing"
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
        </Stack.Navigator>
    )
}

export default AuthStack;