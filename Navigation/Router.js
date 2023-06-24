// General React Imports
import React from 'react';

// Libraries
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Stacks
import AuthStack from './AuthStack';
import AppStack from './AppStack';

// Screens
import Splash from '../Screens/Splash';

const Stack = createNativeStackNavigator()

const Routes = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }} >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen name="AppStack" component={AppStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Routes;