import YoutubePlayer, {
    PLAYER_STATES,
    YoutubeIframeRef,
} from 'react-native-youtube-iframe'
import { StyleSheet, View } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { ColorPalette } from '../../assets/colors'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../../redux/store'
import { showToast } from '../../helpers/toast'
import * as Progress from 'react-native-progress'

type PROP_TYPES = {
    media?: string
}
export const CustomYoutubePlayer = ({ media = '' }: PROP_TYPES) => {
    const videoId = media.split('/').pop()
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const youtubeRef = useRef<YoutubeIframeRef>(null)
    const [isYoutubePlaying, setIsYoutubePlaying] = useState(false)
    const [buttonSize] = useState(30)
    const intervalRef = useRef<number | ReturnType<typeof setTimeout>>(0)
    const [videoProgressbar, setVideoProgressbar] = useState(0)
    const [isMuted, setIsMuted] = useState(false)

    useEffect(() => {
        return stopProgressbarInterval
    }, [])
    const togglePlayingYoutube = () => {
        setIsYoutubePlaying((prev) => !prev)
    }

    const toggleIsMuted = () => {
        setIsMuted((prev) => !prev)
    }

    const seekVideoYoutube = async (isForward = true) => {
        if (youtubeRef.current) {
            const currentTime = await youtubeRef.current.getCurrentTime()
            const moveToTime = isForward ? currentTime + 5 : currentTime - 5
            youtubeRef.current.seekTo(moveToTime, true)
        }
    }

    const errorHandler = (e: string) => {
        showToast({ type: 'error', text1: e })
    }

    const stopProgressbarInterval = () => {
        clearInterval(intervalRef.current)
    }

    const setProgressbar = async () => {
        if (youtubeRef.current) {
            const duration = await youtubeRef.current.getDuration()
            const currentTime = await youtubeRef.current.getCurrentTime()
            const progress = currentTime / duration
            setVideoProgressbar(progress)
        }
    }

    const handleOnChange = (e: PLAYER_STATES) => {
        switch (e) {
            case 'buffering': {
                stopProgressbarInterval()
                break
            }
            case 'playing': {
                intervalRef.current = setInterval(setProgressbar, 1000)
                break
            }
            case 'paused': {
                stopProgressbarInterval()
                setProgressbar()
                break
            }
            case 'ended': {
                setVideoProgressbar(1)
                stopProgressbarInterval()
                break
            }
        }
    }

    const replayVideo = () => {
        if (youtubeRef.current) {
            setVideoProgressbar(0)
            youtubeRef.current.seekTo(0, true)
        }
    }

    const styles = StyleSheet.create({
        youtubeContainer: {},
        youtubeControls: {
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            paddingVertical: 5,
        },
    })

    return (
        <View style={styles.youtubeContainer}>
            <YoutubePlayer
                ref={youtubeRef}
                height={200}
                play={isYoutubePlaying}
                mute={isMuted}
                videoId={videoId}
                onError={errorHandler}
                initialPlayerParams={{
                    controls: false,
                }}
                onChangeState={handleOnChange}
            />
            <Progress.Bar
                progress={videoProgressbar}
                borderColor={ColorPalette[theme].third}
                unfilledColor={ColorPalette[theme].third}
                color={ColorPalette[theme].secondFont}
                width={null}
            />
            <View style={styles.youtubeControls}>
                <AntDesign
                    name="banckward"
                    size={buttonSize}
                    color={ColorPalette[theme].mainFont}
                    onPress={() => seekVideoYoutube(false)}
                />
                <Ionicons
                    name={isMuted ? 'volume-mute' : 'volume-high'}
                    size={buttonSize}
                    color={ColorPalette[theme].mainFont}
                    onPress={toggleIsMuted}
                />
                {videoProgressbar === 1 ? (
                    <AntDesign
                        name="reload1"
                        size={buttonSize}
                        color={ColorPalette[theme].mainFont}
                        onPress={replayVideo}
                    />
                ) : (
                    <>
                        <AntDesign
                            name="pausecircle"
                            size={buttonSize}
                            color={ColorPalette[theme].mainFont}
                            onPress={togglePlayingYoutube}
                            disabled={!isYoutubePlaying}
                        />
                        <AntDesign
                            name="play"
                            size={buttonSize}
                            color={ColorPalette[theme].mainFont}
                            onPress={togglePlayingYoutube}
                            disabled={isYoutubePlaying}
                        />
                    </>
                )}
                <AntDesign
                    name="forward"
                    size={buttonSize}
                    color={ColorPalette[theme].mainFont}
                    onPress={() => seekVideoYoutube(true)}
                />
            </View>
        </View>
    )
}
