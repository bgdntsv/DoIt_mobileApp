import { StyleSheet, Text, View } from 'react-native'
import { useGlobalStyles } from '../hooks/useUI'
import { useTranslation } from 'react-i18next'
import { ResizeMode, Video } from 'expo-av'
import React, { useRef } from 'react'

export const WorkInProgress = () => {
    const globalStyles = useGlobalStyles()
    const { t } = useTranslation()
    const videoRef = useRef(null)
    const styles = StyleSheet.create({
        video: {
            marginTop: 15,
            height: 340,
            maxWidth: '100%',
            maxHeight: '100%',
        },
    })
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.h1}>
                {t('we_are_working_on_this_one')}
            </Text>
            <Video
                ref={videoRef}
                style={styles.video}
                source={require('../assets/videos/working.mp4')}
                useNativeControls={false}
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                shouldPlay={true}
                isMuted={true}
            />
        </View>
    )
}
