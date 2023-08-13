import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {EXERCISES_NAVIGATION_TYPES} from '../app/HomeStack/CreateExercise/CreateExercise'
import {Pressable, StyleSheet} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../redux/store'
import {ColorPalette} from '../assets/colors'

type PROP_TYPES = {
    navigation: NativeStackScreenProps<EXERCISES_NAVIGATION_TYPES>,
}
export const BackButtonNavigation = ({navigation}: PROP_TYPES) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const handleNavigate = () => {
        navigation.navigation.goBack()
    }
    const styles = StyleSheet.create({
        container: {
            marginTop: 12,
            marginBottom: 8,
            marginLeft: 5
        }
    })
    return <Pressable style={styles.container} onPress={handleNavigate}>
        <AntDesign name="arrowleft" size={24} color={ColorPalette[theme].mainFont}/>
    </Pressable>
}
