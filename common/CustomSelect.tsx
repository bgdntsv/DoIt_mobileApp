import { ColorPalette } from '../assets/colors'
import React from 'react'
import { useGlobalStyles } from '../hooks/useUI'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../redux/store'
import { StyleSheet } from 'react-native'
import { Picker, PickerProps } from '@react-native-picker/picker'

interface PROP_TYPE extends PickerProps {
    items: Array<{
        label: string
        value: string
    }>
}

export const CustomSelect = ({ items, ...prop }: PROP_TYPE) => {
    const { styles: globalStyles } = useGlobalStyles()
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const styles = StyleSheet.create({
        input: {
            padding: 0,
            height: 47,
            color: ColorPalette[theme].mainFont,
        },
        container: {
            minWidth: 80,
            display: 'flex',
            justifyContent: 'center',
        },
    })

    return (
        <Picker {...prop} dropdownIconColor={ColorPalette[theme].mainFont} style={styles.input}>
            {items.map((e, i) => (
                <Picker.Item style={globalStyles.span} label={e.label} value={e.value} key={i} />
            ))}
        </Picker>
    )
}
