import { Pressable, StyleSheet, Text } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../redux/store'
import { ColorPalette } from '../assets/colors'
import { useNavigation } from '@react-navigation/native'
import { useGlobalStyles } from '../hooks/useUI'
import React from 'react'

export const BackButtonNavigation = ({ title, onPress }: { title?: string; onPress?: () => void }) => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const navigation = useNavigation()
    const handlePress = () => {
        if (onPress) {
            onPress()
        }
        navigation.goBack()
    }
    const {
        styles: { p },
    } = useGlobalStyles()
    const styles = StyleSheet.create({
        container: {
            marginTop: 12,
            marginBottom: 8,
            marginLeft: 5,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        title: {
            ...p,
            marginLeft: 7,
        },
    })
    return (
        <Pressable style={styles.container}>
            <MaterialIcons name="arrow-back" size={24} color={ColorPalette[theme].mainFont} onPress={handlePress} />
            {title && <Text style={styles.title}>{title}</Text>}
        </Pressable>
    )
}
