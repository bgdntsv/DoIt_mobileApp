import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {ExercisesList} from './ExercisesList'
import Chest from './exercises/chest'
import Abs from './exercises/abs'
import {View} from 'react-native'
import {ColorPalette} from '../../assets/colors'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../../redux/store'

export const Home = () => {
    const Stack = createNativeStackNavigator()
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)

    return <Stack.Navigator initialRouteName={'Home'} screenOptions={{
        headerBackground: () => {
            return <View style={{backgroundColor: ColorPalette[theme].fourth}}></View>
        },
        headerTintColor: ColorPalette[theme].mainFont
    }}>
        <Stack.Screen name={'Home'} component={ExercisesList} options={{headerShown:false}}/>
        <Stack.Screen name={'Chest-exercises'} component={Chest}/>
        <Stack.Screen name={'Abs-exercises'} component={Abs}/>
    </Stack.Navigator>
}
