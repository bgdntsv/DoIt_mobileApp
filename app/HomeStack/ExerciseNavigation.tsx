import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ExercisesMain} from './ExercisesMain'
import {Chest} from './Exercises/Chest'
import {ABS} from './Exercises/ABS'
import {GenerateExercise} from './GenerateExercise/GenerateExercise'
import {CreateExercise} from './CreateExercise/CreateExercise'
import {Legs} from './Exercises/Legs'
import {Hands} from './Exercises/Hands'
import {Shoulders} from './Exercises/Shoulders'
import {Back} from './Exercises/Back'

export const ExerciseNavigation = () => {
    const Stack = createNativeStackNavigator()
    return <Stack.Navigator initialRouteName={'Exercise-list'}
                            screenOptions={{headerShown: false}} >
        <Stack.Screen name={'Exercise-list'} component={ExercisesMain}/>
        <Stack.Screen name={'Generate-exercise'} component={GenerateExercise}/>
        <Stack.Screen name={'Create-exercise'} component={CreateExercise}/>
        <Stack.Screen name={'Chest-exercises'} component={Chest}/>
        <Stack.Screen name={'Abs-exercises'} component={ABS}/>
        <Stack.Screen name={'Legs-exercises'} component={Legs}/>
        <Stack.Screen name={'Hands-exercises'} component={Hands}/>
        <Stack.Screen name={'Shoulders-exercises'} component={Shoulders}/>
        <Stack.Screen name={'Back-exercises'} component={Back}/>
    </Stack.Navigator>
}
