import React from "react"
import { View, Text } from 'react-native'
import CustomButton from "../CustomButton/CustomButton"

const SocialSignInButtons = () => {

    const onSignInFacebook = () => {
        console.warn('Facebook')
    }

    const onSignInGoogle = () => {
        console.warn('Google')
    }

    const onSignInApple = () => {
        console.warn('Apple')
    }

    return (
        <>
            <CustomButton
                text='Sign In with Facebook'
                onPress={onSignInFacebook}
                //type='SPECIAL'
                bgColor='#E7EAF4'
                fgColor='#4765A9'
            />

            <CustomButton
                text='Sign In with Google'
                onPress={onSignInGoogle}
                //type='SPECIAL'
                bgColor='#FAE9EA'
                fgColor='#DD4D44'
            />

            <CustomButton
                text='Sign In with Apple'
                onPress={onSignInApple}
                //type='SPECIAL'
                bgColor='#e3e3e3'
                fgColor='#363636'
            />
        </>
    )
}

export default SocialSignInButtons