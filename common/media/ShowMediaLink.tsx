import React, { useEffect, useMemo, useState } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { ResizeMode, Video } from 'expo-av'
import { MEDIA_LINK_TYPE } from '../../redux/slices/exerciseSlice'
import WebView from 'react-native-webview'
import { showToast } from '../../helpers/toast'
import { CustomModal } from '../CustomModal'
import { CustomYoutubePlayer } from './CustomYoutubePlayer'
import * as Network from 'expo-network'
import { NoInternetMedia } from './NoInternetMedia'

type PROP_TYPES = {
    link: MEDIA_LINK_TYPE
}

export const ShowMediaLink = ({ link }: PROP_TYPES) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isInternetConnection, setIsInternetConnection] = useState(true)
    useEffect(() => {
        const init = async () => {
            const { isConnected } = await Network.getNetworkStateAsync()
            if (isConnected === false) {
                setIsInternetConnection(isConnected)
            }
        }
        init()
    }, [])
    const errorHandler = (e: string) => {
        showToast({ type: 'error', text1: e })
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const styles = StyleSheet.create({
        mediaContainer: {
            width: '100%',
            height: 220,
        },
        urlMedia: {
            width: '100%',
            height: '50%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            backgroundColor: 'transparent',
        },
        image: {
            width: '100%',
            height: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
        },
    })

    const getContent = useMemo(() => {
        const media = link[0]
        if (typeof media === 'string') {
            if (!isInternetConnection) {
                return <NoInternetMedia />
            }
            if (media.includes('youtu')) {
                return <CustomYoutubePlayer media={media} />
            }

            return (
                <Pressable style={styles.mediaContainer} onPress={openModal}>
                    <WebView
                        style={styles.urlMedia}
                        source={{
                            uri: media,
                        }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        isMuted
                        shouldPlay
                        onError={() => errorHandler("Can't load source")}
                    />
                </Pressable>
            )
        } else {
            return media.type === 'image' ? (
                <Pressable style={styles.mediaContainer} onPress={openModal}>
                    <Image style={styles.image} source={{ uri: media.uri }} />
                </Pressable>
            ) : (
                <Pressable style={styles.mediaContainer} onPress={openModal}>
                    <Video
                        style={styles.urlMedia}
                        source={{
                            uri: media.uri,
                        }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        isMuted
                        shouldPlay
                        onError={errorHandler}
                    />
                </Pressable>
            )
        }
    }, [link, isInternetConnection])
    return (
        <>
            {getContent}
            <CustomModal visible={isModalOpen} onRequestClose={closeModal}>
                {typeof link[0] === 'string' ? (
                    <WebView
                        style={styles.urlMedia}
                        source={{
                            uri: link[0],
                        }}
                        useNativeControls={false}
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                        isMuted
                        shouldPlay
                        onError={() => errorHandler("Can't load source")}
                    />
                ) : (
                    <Image style={styles.image} source={{ uri: link[0].uri }} />
                )}
            </CustomModal>
        </>
    )
}
