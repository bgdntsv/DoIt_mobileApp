import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ExercisesList} from './ExercisesList'
import Chest from './exercises/Chest'
import ABS from './exercises/ABS'
import {ColorPalette} from '../../assets/colors'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../../redux/store'

export const ExerciseNavigation = () => {
    const Stack = createNativeStackNavigator()
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    return <Stack.Navigator initialRouteName={'Exercise-list'}
                            screenOptions={{
        headerTransparent: true,
        headerTintColor: ColorPalette[theme].mainFont
    }} >
        <Stack.Screen name={'Exercise-list'} component={ExercisesList} options={{headerShown: false}}/>
        <Stack.Screen name={'Chest-exercises'} component={Chest} options={{title: 'Груди'}}/>
        <Stack.Screen name={'Abs-exercises'} component={ABS} options={{title: 'Прес'}}/>
    </Stack.Navigator>
}
