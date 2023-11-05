import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ExercisesMain } from './ExercisesMain'
import { ExerciseType } from './Exercises/ExerciseType'
import { GenerateTraining } from './GenerateExercise/GenerateTraining'
import { CreateTraining } from './CreateExercise/CreateTraining'
import { SelectTraining } from './SelectTraining/SelectTraining'
import React from 'react'

export type HOME_STACK_ROUTE_PROPS = {
    Start: undefined
    'Generate-training': undefined
    'Create-training': { comesFromSelectTraining: boolean }
    'Select-training': undefined
    'Exercises-type': {
        exerciseType:
            | 'press'
            | 'chest'
            | 'legs'
            | 'hands'
            | 'shoulders'
            | 'back'
    }
}
export const ExerciseNavigation = () => {
    const Stack = createNativeStackNavigator<HOME_STACK_ROUTE_PROPS>()
    return (
        <Stack.Navigator
            initialRouteName={'Start'}
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name={'Start'} component={ExercisesMain} />
            <Stack.Screen
                name={'Generate-training'}
                component={GenerateTraining}
            />
            <Stack.Screen name={'Create-training'} component={CreateTraining} />
            <Stack.Screen name={'Select-training'} component={SelectTraining} />
            <Stack.Screen name={'Exercises-type'} component={ExerciseType} />
        </Stack.Navigator>
    )
}
