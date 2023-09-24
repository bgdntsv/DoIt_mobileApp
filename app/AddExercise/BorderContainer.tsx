import { Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import { ColorPalette } from '../../assets/colors'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../../redux/store'

type PROP_TYPES = {
    title?: string | React.ReactNode
    isRequiredField?: boolean
    children: React.ReactNode
    onPress?: () => void
}
export const BorderContainer = ({
    title,
    isRequiredField,
    children,
    onPress,
}: PROP_TYPES) => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const styles = StyleSheet.create({
        container: {
            borderWidth: 1,
            borderColor: ColorPalette[theme].second,
            borderRadius: 5,
            paddingVertical: 8,
            paddingHorizontal: 8,
            marginTop: 15,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
        },
        title: {
            position: 'absolute',
            backgroundColor: ColorPalette[theme].main,
            top: -11,
            paddingHorizontal: 5,
            marginLeft: 12,
            color: ColorPalette[theme].second,
        },
    })
    return (
        <Pressable style={styles.container} onPress={onPress}>
            {typeof title === 'string' ? (
                <Text style={styles.title}>
                    {title}
                    {isRequiredField && '*'}
                </Text>
            ) : (
                title
            )}
            {children}
        </Pressable>
    )
}
