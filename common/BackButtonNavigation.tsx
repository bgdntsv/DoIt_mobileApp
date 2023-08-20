import {Pressable, StyleSheet, Text} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../redux/store'
import {ColorPalette} from '../assets/colors'
import {useNavigation} from '@react-navigation/native'
import {useGlobalStyles} from '../hooks/useUI'

export const BackButtonNavigation = ({title}:{title?:string}) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const navigation = useNavigation()
    const handleNavigate = () => {
        navigation.goBack()
    }
    const {p} = useGlobalStyles()
    const styles = StyleSheet.create({
        container: {
            marginTop: 12,
            marginBottom: 8,
            marginLeft: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        title: {
            ...p,
            marginLeft: 7,

        }
    })
    return <Pressable style={styles.container} onPress={handleNavigate}>
        <AntDesign name="arrowleft" size={24} color={ColorPalette[theme].mainFont}/>
        {title && <Text style={styles.title}>{title}</Text>}
    </Pressable>
}
