import React, { ReactNode } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Bar } from 'react-native-progress'
import { STORE_TYPE } from '../../../../redux/store'
import { useGlobalStyles } from '../../../../hooks/useUI'
import { ColorPalette } from '../../../../assets/colors'

type PROPS = {
    stepsCount: number
    currentStep: number
    onStepClick?: (stepCount: number) => void
}
export const ProgressStepBar = ({ stepsCount, currentStep, onStepClick }: PROPS) => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const {
        styles: { span },
    } = useGlobalStyles()
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 7,
            height: 70,
            display: 'flex',
            justifyContent: 'center',
        },
        circle: {
            width: 44,
            height: 44,
            borderRadius: 22,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: ColorPalette[theme].second,
            borderWidth: 1,
        },
        activeCircle: {
            backgroundColor: ColorPalette[theme].second,
        },
        text: {
            ...span,
        },
        activeText: {
            ...span,
            color: ColorPalette[theme].secondFont,
        },
        step: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        bar: {
            height: 8,
            borderRadius: 0,
            borderColor: ColorPalette[theme].second,
            borderRightWidth: 0,
            borderLeftWidth: 0,
        },
    })
    const onStepPress = (step: number) => {
        if (onStepClick) {
            onStepClick(step)
        }
    }
    const getContent = (): Array<ReactNode> => {
        const content = []
        for (let i = 1; i <= stepsCount; i++) {
            const isActiveStep = i <= currentStep
            content.push(
                <View style={styles.step} key={i}>
                    <Pressable
                        onPress={() => onStepPress(i)}
                        style={isActiveStep ? { ...styles.circle, ...styles.activeCircle } : styles.circle}
                    >
                        <Text style={isActiveStep ? styles.activeText : styles.text}>{i}</Text>
                    </Pressable>
                    {i !== stepsCount && (
                        <Bar
                            style={styles.bar}
                            color={ColorPalette[theme].second}
                            progress={
                                (currentStep < i && 0) || (currentStep === i && 0.5) || (currentStep > i && 1) || 0
                            }
                            width={50}
                        />
                    )}
                </View>
            )
        }
        return content
    }
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                {getContent()}
            </ScrollView>
        </View>
    )
}
