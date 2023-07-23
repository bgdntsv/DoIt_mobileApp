import React from 'react'
import {Button, View, StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../redux/store'
import {ColorPalette} from '../assets/colors'
export type BUTTON_COMPONENT_TYPE = {
    title: string,
    onPress: ()=>void,
    disabled?: boolean
}
export const CustomButton = ({title, onPress, disabled}: BUTTON_COMPONENT_TYPE) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const styles = StyleSheet.create({
        buttonContainer: {
            borderRadius: 5,
            overflow: 'hidden'
        }
    })
    return <View style={styles.buttonContainer}>
        <Button title={title} onPress={onPress} color={ColorPalette[theme].second} disabled={disabled} />
    </View>
}
