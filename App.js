// General React Imports
import React, {useEffect, useRef} from 'react';
import { View, Text, StyleSheet, LogBox, Image } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import NotificationPopup from 'react-native-push-notification-popup';
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from './src/redux';
import { NativeBaseProvider } from 'native-base'
// Files
import Routes from './src/Navigation/Router';
import colors from './src/assets/colors';


LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
LogBox.ignoreAllLogs();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {

  const popupRef = useRef(null)
  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      //navigation.navigate(remoteMessage.data.type);
    });
    messaging().onMessage(async remoteMessage => {
      // if (remoteMessage) {
      InAppNotifications(remoteMessage)
      //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      // }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });
  }, []);
  useEffect(() => {
    requestUserPermission()
  }, [])
  const requestUserPermission = async () => {
    console.log('<<==== fcm permission ===>>')
    const authStatus = await messaging().requestPermission();
    const fcmToken = await messaging().getToken()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("enabled===>>>", enabled);
      console.log('Authorization status:', authStatus);
      console.log('token-=-=---=-=-=-=-====>>', fcmToken)
    }
  }
  const renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => {
    console.log('appTitle====>>', appTitle);
    console.log('timeText====>>', timeText);
    console.log('title====>>', title);
    console.log('body====>>', body);
    return (
      <View style={styles.notification}>
        <View style={{ width: '100%', flexDirection: 'row',paddingVertical:10 }}>
          <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
            {/* <Image source={} style={{ width: "30%", height: 25, resizeMode: 'center' }} /> */}
          </View>
          <View style={{ width: '80%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',}}>
            <Text style={styles.text}>{appTitle}</Text>
            <Text style={styles.text1}>{body}</Text>
          </View>
        </View>
      </View>
    )
  }

  const InAppNotifications = (remoteMessage) => {
    if (popupRef.current) {
      popupRef.current?.show({
        appTitle: 'Date Closet',
        timeText: 'Now',
        title: 'New Notification',
        body: remoteMessage.notification.body,
        slideOutTime: 2000
      })
    }
  }

  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate
          persistor={persistor}>
          <Routes />
        </PersistGate>
        <NotificationPopup
        ref={popupRef}
        renderPopupContent={renderCustomPopup}
        shouldChildHandleResponderStart={true}
        shouldChildHandleResponderMove={true} />
      </Provider>
    </NativeBaseProvider>
  )
};

export default App;
const styles = StyleSheet.create({
  notification: {
    // marginTop: 20,
    width: '100%',
    backgroundColor: colors.darkGray,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    width: '100%',
    // textAlign: 'left',
    color: colors.appPink,
    fontSize: 14,
    fontWeight:'700'
    // marginLeft: 10,
  },
  text1: {
    width: '100%',
    // textAlign: 'left',
    color: colors.white,
    fontSize: 12,
    // marginLeft: 10,
  }
})