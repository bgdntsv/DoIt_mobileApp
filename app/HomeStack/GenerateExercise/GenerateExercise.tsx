import {View} from 'react-native'
import {useGlobalStyles} from '../../../hooks/useUI'
import {WorkInProgress} from '../../../common/WorkInProgress'
import {BackButtonNavigation} from '../../../common/BackButtonNavigation'
import React from 'react'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {EXERCISES_NAVIGATION_TYPES} from '../CreateExercise/CreateExercise'

export const GenerateExercise = (navigation: NativeStackScreenProps<EXERCISES_NAVIGATION_TYPES>) => {
    const globalStyles = useGlobalStyles()
    return <View style={globalStyles.container}>
        <BackButtonNavigation navigation={navigation}/>
        <WorkInProgress/>
    </View>
}
