// General React Imports
import React, { useState } from 'react'
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
} from 'react-native'

// Libraries
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StackActions } from '@react-navigation/native';
import Toast from 'react-native-simple-toast'
import { enabbleSignIn, GuestUser, isSginedIn, signuptoken, useremail, userid } from '../../redux/actions/userSession';
// Files
import loginStyles from './loginStyles'
import Icons from '../../assets/icons/icons'

//Components 
import AuthHeader from '../../Components/AuthHeader'
import AppTextInput from '../../Components/AppTextInput'
import AppButton from '../../Components/AppButton'
import AuthBottomContainer from '../../Components/AuthBottomContainer'
import Loader from '../../Components/Loader';

//API
import { Login_Api } from '../../API/Methods/auth';
import { useDispatch } from 'react-redux';

const Login = ({ navigation }) => {

    const pageHeading = "Login to Date Closet"
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [loading, setLoading] = useState(false)


    const inputCheck = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
         if (email === '') {
            Toast.show('Enter a Email')
        }
        else if (reg.test(email) === false) {
            Toast.show("Enter a correct Email")
        }
        else if (password === '') {
            Toast.show("Password is required")
        }
        else if (password.length < 6) {
            Toast.show("Password more then 6 Characters")
        }

        else {
            Login()
        }
    }


    const Login = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('email', email)
            formData.append('password', password)
            console.log('formData-response===>>>', formData)
            const response = await Login_Api(formData)
            console.log("Login_Api ==>>>", response.data);
            if (response.data.status == 200) {
                Toast.show(response.data.message)
                dispatch(enabbleSignIn(true))
                dispatch(GuestUser(false))
                navigation.dispatch(StackActions.replace("AppStack"))
                dispatch(signuptoken(response?.data?.token))
                dispatch(userid(response.data?.user?.id))
                dispatch(useremail(response.data?.user?.email))
                setEmail(null)
                setPassword(null)
            }
            else if(response.data.status == 400){
                Toast.show(response.data.message)
            }
        } catch (error) {
            console.log("SignUpApi-error===>>>", error?.response.data);
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={loginStyles.mainContainer}>
            <AuthHeader
                label={"Login"}
                onBackPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ flexGrow: 1 }}
            >
                <View style={loginStyles.innerContainer}>
                    <Text style={loginStyles.heading}>{pageHeading.toUpperCase()}</Text>
                    <AppTextInput
                        title="Email"
                        placeholder={"Enter Email"}
                        mainContainer={{ marginTop: 40 }}
                        icon={Icons.mailIcon}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType={"email-address"}
                    />
                    <AppTextInput
                        title="Password"
                        placeholder={"*********"}
                        mainContainer={{ marginTop: 40 }}
                        icon={Icons.lockIcon}
                        value={password}
                        secureTextEntry={showPassword}
                        onChangeText={(text) => setPassword(text)}
                        onIconPress={() => setShowPassword(!showPassword)}
                    />
                    <AppButton
                        mainContainer={loginStyles.loginButton}
                        label="Login"
                        onPress={() => inputCheck()}
                        // onPress={() => navigation.dispatch(StackActions.replace("AppStack"))}
                    />
                    <View style={loginStyles.rowContainer}>
                        <Text style={loginStyles.signInText}>{"Problem signing in?"}</Text>
                        <TouchableOpacity style={loginStyles.resetPasswordContainer}
                            onPress={() => navigation.navigate("ForgotPassword")}
                        >
                            <Text style={loginStyles.resetPasswordText}>{"Reset Password"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <AuthBottomContainer
                    buttonLabel={"Visit as a Guest User"}
                    message={"Don’t Have an Account?"}
                    actionLabel={"Sign up"}
                    labelAllCaps={true}
                    onActionPress={() => navigation.navigate("SignUp")}
                    onPress={() => {
                        dispatch(GuestUser(true))
                        dispatch
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'AppStack' }],
                        })
                    }}
                />
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView >
    )
}

export default Login
