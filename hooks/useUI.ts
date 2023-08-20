import {StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../redux/store'
import {ColorPalette} from '../assets/colors'

export const useGlobalStyles = () => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    return StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: ColorPalette[theme].main,
            marginVertical: 10,
            paddingHorizontal: 8,
        },
        h1:{
            fontFamily: 'Inter-Regular',
            fontWeight: 'bold',
            fontSize: 22,
            color: ColorPalette[theme].mainFont
        },
        p:{
            fontFamily: 'Inter-Regular',
            fontSize: 18,
            color: ColorPalette[theme].mainFont
        },
        span:{
            fontFamily: 'Inter-Regular',
            fontSize: 16,
            color: ColorPalette[theme].mainFont
        }
    })
}
