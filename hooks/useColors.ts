import { mostReadable } from 'tinycolor2'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../redux/store'
import { ColorPalette } from '../assets/colors'

export const useColors = () => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)

    const generateBgColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0')
        return `#${randomColor}`
    }
    const generateFontColor = (bgColor = ''): string => {
        return mostReadable(bgColor, [
            ColorPalette[theme].mainFont,
            ColorPalette[theme].secondFont,
            ColorPalette[theme].placeholderFont,
        ]).toHexString()
    }
    return { generateBgColor, generateFontColor }
}
