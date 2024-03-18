import { StyleSheet, TextInputProps } from 'react-native'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../redux/store'
import { ColorPalette } from '../assets/colors'

export const useGlobalStyles = () => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: ColorPalette[theme].main,
            marginVertical: 10,
            paddingHorizontal: 8,
        },
        h1: {
            fontFamily: 'Inter-Regular',
            fontWeight: 'bold',
            fontSize: 20,
            color: ColorPalette[theme].mainFont,
        },
        p: {
            fontFamily: 'Inter-Regular',
            fontSize: 16,
            color: ColorPalette[theme].mainFont,
        },
        span: {
            fontFamily: 'Inter-Regular',
            fontSize: 14,
            color: ColorPalette[theme].mainFont,
        },
        span1: {
            fontFamily: 'Inter-Regular',
            fontSize: 12,
            color: ColorPalette[theme].mainFont,
        },
        modal: {
            backgroundColor: ColorPalette[theme].main,
        },
        input: {
            maxHeight: 100,
            paddingHorizontal: 5,
        },
        whiteText: {
            color: ColorPalette[theme].secondFont,
        },
    })
    const inputProps: TextInputProps = {
        placeholderTextColor: ColorPalette[theme].placeholderFont,
        style: { ...styles.span, ...styles.input },
        cursorColor: ColorPalette[theme].mainFont,
    }
    return {
        styles,
        inputProps,
    }
}
