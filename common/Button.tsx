import React from 'react'
import {ColorPalette} from '../assets/colors'
import {Button} from 'react-native'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../redux/store'
export type BUTTON_COMPONENT_TYPE = {
    title: string,
    onPress: ()=>void,
    disabled?: boolean
}
export const CustomButton = ({title, onPress, disabled}: BUTTON_COMPONENT_TYPE) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)

    return <Button title={title} onPress={onPress} color={ColorPalette[theme].second} disabled={disabled} />
}
