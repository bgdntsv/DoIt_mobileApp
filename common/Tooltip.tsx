import React from 'react'
import { ColorPalette } from '../assets/colors'
import { StyleSheet, Text, View } from 'react-native'
import { Popable, usePopable } from 'react-native-popable'
import { PopableProps } from 'react-native-popable/lib/typescript/Popable'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../redux/store'
import { useGlobalStyles } from '../hooks/useUI'
import { useTranslation } from 'react-i18next'

export const Tooltip = ({ children, content, ...prop }: PopableProps) => {
    const { ref } = usePopable()
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const { styles: globalStyles } = useGlobalStyles()
    const { t } = useTranslation()

    const styles = StyleSheet.create({
        text: {
            ...globalStyles.span,
            color: ColorPalette[theme].secondFont,
        },
        textContainer: {
            padding: 5,
        },
    })

    return (
        <Popable
            {...prop}
            ref={ref}
            backgroundColor={ColorPalette[theme].second}
            style={{ width: 150 }}
            content={
                typeof content === 'string' ? (
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{t(content)}</Text>
                    </View>
                ) : (
                    content
                )
            }
        >
            {children}
        </Popable>
    )
}
