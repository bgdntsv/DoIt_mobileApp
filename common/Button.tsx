import React, { ReactElement } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../redux/store'
import { ColorPalette } from '../assets/colors'

export type BUTTON_COMPONENT_TYPE = {
    title: string
    onPress: () => void
    disabled?: boolean
    style?: object
    icon?: ReactElement
    second?: boolean
}
export const CustomButton = ({
    title,
    onPress,
    disabled,
    style,
    icon,
    second,
}: BUTTON_COMPONENT_TYPE) => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const animated = new Animated.Value(1)
    const fadeIn = () => {
        Animated.timing(animated, {
            toValue: 0.6,
            duration: 100,
            useNativeDriver: true,
        }).start()
    }
    const fadeOut = () => {
        Animated.timing(animated, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start()
    }
    const styles = StyleSheet.create({
        buttonContainer: {
            backgroundColor: second
                ? ColorPalette[theme].main
                : disabled
                ? ColorPalette[theme].third
                : ColorPalette[theme].second,
            borderRadius: 5,
            padding: 8,
            marginVertical: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderColor: second ? ColorPalette[theme].mainFont : 'none',
            borderWidth: second ? 1 : 0,
        },
        text: {
            color: second
                ? ColorPalette[theme].mainFont
                : ColorPalette[theme].secondFont,
            fontSize: 18,
            textAlign: 'center',
        },
        icon: {
            marginLeft: 5,
        },
    })
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled}
            onPressIn={fadeIn}
            onPressOut={fadeOut}
        >
            <Animated.View
                style={{
                    ...styles.buttonContainer,
                    opacity: animated,
                    ...style,
                }}
            >
                <Text style={styles.text}>{title}</Text>
                <View style={styles.icon}>{icon}</View>
            </Animated.View>
        </Pressable>
    )
}
