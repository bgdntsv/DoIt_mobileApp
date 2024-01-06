import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ExercisesMain } from './ExercisesMain'
import { GenerateTraining } from './GenerateExercise/GenerateTraining'
import { CreateTraining } from './CreateTraining/CreateTraining'
import { SelectTraining } from './SelectTraining/SelectTraining'
import React from 'react'
import { ExerciseType } from './CreateTraining/components/ExercisesByType'
import { Training } from './Training/Training'
import { useNavigation } from '@react-navigation/native'
import { DrawerScreenProps } from '@react-navigation/drawer'
import { DRAWER_PROP_TYPES } from '../Navigation'
import { ConfirmTraining } from './CreateTraining/ConfirmTraining'
import { TrainingProcess } from './Training/TrainingProcess'

export type HOME_STACK_ROUTE_PROPS = {
    Start: undefined
    'Generate-training': undefined
    'Create-training': { comesFromSelectTraining: boolean }
    'Select-training': undefined
    'Exercises-type': {
        exerciseType: 'press' | 'chest' | 'legs' | 'hands' | 'shoulders' | 'back'
        comesFromSelectTraining?: boolean
    }
    Training: { trainingId: string }
    'Confirm-training': undefined
    'Training-process': { trainingId: string }
}
export const ExerciseNavigation = ({ navigation }: DrawerScreenProps<DRAWER_PROP_TYPES, 'Home', 'Drawer'>) => {
    const Stack = createNativeStackNavigator<HOME_STACK_ROUTE_PROPS>()
    const { navigate } = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    React.useEffect(() => {
        return navigation.addListener('drawerItemPress', ({ target }) => {
            if (target?.includes('Home')) {
                navigate('Start')
            }
        })
    }, [navigation])
    return (
        <Stack.Navigator initialRouteName={'Start'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={'Start'} component={ExercisesMain} />
            <Stack.Screen name={'Generate-training'} component={GenerateTraining} />
            <Stack.Screen name={'Create-training'} component={CreateTraining} />
            <Stack.Screen name={'Select-training'} component={SelectTraining} />
            <Stack.Screen name={'Exercises-type'} component={ExerciseType} />
            <Stack.Screen name={'Training'} component={Training} />
            <Stack.Screen name={'Confirm-training'} component={ConfirmTraining} />
            <Stack.Screen name={'Training-process'} component={TrainingProcess} />
        </Stack.Navigator>
    )
}
