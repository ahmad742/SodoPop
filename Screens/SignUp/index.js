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
import Toast from 'react-native-simple-toast'
import { useDispatch } from 'react-redux';

// Files
import signUpStyles from './signUpStyles'
import Icons from '../../assets/icons/icons'

//Components 
import AuthHeader from '../../Components/AuthHeader'
import AppTextInput from '../../Components/AppTextInput'
import AppButton from '../../Components/AppButton'
import AuthBottomContainer from '../../Components/AuthBottomContainer'
import Loader from '../../Components/Loader';

// API
import { SignUpApi } from '../../API/Methods/auth'
import { signuptoken, useremail, userid } from '../../redux/actions/userSession';

const SignUp = ({ navigation }) => {
    const pageHeading = "Sign up to Date Closet"
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [loading, setLoading] = useState(false)

    const inputCheck = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const validNameRegex = /^([a-zA-Z ]){2,30}$/
        if (name === '') {
            Toast.show('Enter a Name')
        }
       else if (name === '') {
            Toast.show('Enter a Name')
        }
       else if (validNameRegex.test(name) === false) {
            Toast.show('Enter a Alphabetic Character in name field')
        }
        else if (email === '') {
            Toast.show('Enter a Email')
        }
        // else if (reg.test(email) === false) {
        //     Toast.show("Enter a correct Email")
        // }
        else if (password === '') {
            Toast.show("Password is required")
        }
        else if (confirmPassword === '') {
            Toast.show("Enter Confirm Password")
        }
        else if (password !== confirmPassword) {
            Toast.show("Password does not match")
        }
        else if (password.length < 6) {
            Toast.show("Password more then 6 Characters")
        }

        else {
            Register()
        }
    }


    const Register = async () => {

        setLoading(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('confirm_password', confirmPassword)
            formData.append('type', "user")
            console.log('formData-response===>>>', formData)

            const response = await SignUpApi(formData)
            console.log("SignUpApi-response===>>>", response.data);
            if (response.data.status == 200) {
                Toast.show(response.data.message)
                navigation.navigate("EmailVerification",{
                    Email:response.data.user.email,
                    UserName:response.data.user.name
                })
                dispatch(signuptoken(response?.data?.token))
                dispatch(useremail(response.data?.user?.email))
                
                setName(null)
                setEmail(null)
                setPassword(null)
                setConfirmPassword(null)
            }
            else if(response.data.status == 202) {
                Toast.show(response.data.message)
            }
        } catch (error) {
            console.log("SignUpApi-error===>>>", error);
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <SafeAreaView style={signUpStyles.mainContainer}>
            <AuthHeader
                label={"Sign Up"}
                onBackPress={() => navigation.goBack()}
            />
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={{ flexGrow: 1 }}>
                <View style={signUpStyles.innerContainer}>
                    <Text style={signUpStyles.heading}>{pageHeading.toUpperCase()}</Text>
                    <AppTextInput
                        title="Name"
                        placeholder={"Full Name"}
                        mainContainer={{ marginTop: 40 }}
                        icon={Icons.mailIcon}
                        value={name}
                        onChangeText={(text)=>setName(text)}
                    />
                    <AppTextInput
                        title="Email"
                        placeholder={"Enter Email"}
                        mainContainer={{ marginTop: 40 }}
                        icon={Icons.mailIcon}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
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
                    <AppTextInput
                        title="Confirm Password"
                        placeholder={"*********"}
                        mainContainer={{ marginTop: 40 }}
                        icon={Icons.lockIcon}
                        value={confirmPassword}
                        secureTextEntry={showConfirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    <AppButton
                        mainContainer={signUpStyles.loginButton}
                        label="Sign Up"
                        // onPress={() => Register()}
                    onPress={() =>inputCheck()}
                    // onPress={() => navigation.navigate("EmailVerification")}
                    />
                </View>
                <AuthBottomContainer
                    buttonLabel={"Visit as a Guest User"}
                    message={"Already have an account?"}
                    actionLabel={"Sign in"}
                    labelAllCaps={true}
                    onActionPress={() => navigation.navigate("Login")}
                />
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default SignUp
