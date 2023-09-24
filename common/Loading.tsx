import React, { useRef } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../redux/store'
import { ColorPalette } from '../assets/colors'
import { useTranslation } from 'react-i18next'

export const Loading = () => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const animation = useRef(null)
    const { t } = useTranslation()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: ColorPalette[theme].main,
            justifyContent: 'center',
            alignItems: 'center',
        },
        animation: {
            width: '50%',
        },
        p: {
            fontSize: 18,
            color: ColorPalette[theme].mainFont,
        },
    })
    return (
        <View style={styles.container}>
            {Platform.OS !== 'web' && (
                <LottieView
                    autoPlay
                    ref={animation}
                    style={styles.animation}
                    source={require('../assets/animations/loading.json')}
                    speed={1.8}
                />
            )}
            <Text style={styles.p}>{t('warming_up')}</Text>
        </View>
    )
}
