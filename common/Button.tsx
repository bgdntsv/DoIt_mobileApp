import React from 'react'
import {StyleSheet, Pressable, Text, Animated} from 'react-native'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../redux/store'
import {ColorPalette} from '../assets/colors'

export type BUTTON_COMPONENT_TYPE = {
    title: string,
    onPress: () => void,
    disabled?: boolean
}
export const CustomButton = ({title, onPress, disabled}: BUTTON_COMPONENT_TYPE) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const animated = new Animated.Value(1)
    const fadeIn = () => {
        Animated.timing(animated, {
            toValue: 0.6,
            duration: 100,
            useNativeDriver: true
        }).start()
    }
    const fadeOut = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start()
    }
    const styles = StyleSheet.create({
        buttonContainer: {
            backgroundColor: disabled ? ColorPalette[theme].third : ColorPalette[theme].second,
            borderRadius: 5,
            padding: 7
        },
        text: {
            color: ColorPalette[theme].secondFont,
            fontSize: 18,
            textAlign: 'center'
        }
    })
    return <Pressable onPress={onPress} disabled={disabled} onPressIn={fadeIn} onPressOut={fadeOut}>
        <Animated.View style={{...styles.buttonContainer, opacity: animated}}>
            <Text style={styles.text}>{title}</Text>
        </Animated.View>
    </Pressable>
}
