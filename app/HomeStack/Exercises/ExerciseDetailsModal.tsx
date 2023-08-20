import React from 'react'
import {Image, Modal, StyleSheet, Text, View} from 'react-native'
import {EXERCISE_TYPE} from '../../../redux/slices/exerciseSlice'
import {useGlobalStyles} from '../../../hooks/useUI'
import {ResizeMode, Video} from 'expo-av'
import {useTranslation} from 'react-i18next'
import {ColorPalette} from '../../../assets/colors'
import {AntDesign} from '@expo/vector-icons'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../../../redux/store'

type PROP_TYPES = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    exercise: EXERCISE_TYPE
}
export const ExerciseDetailsModal = ({isOpen, setIsOpen, exercise}: PROP_TYPES) => {
    const globalStyles = useGlobalStyles()
    const {t} = useTranslation()
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)

    const closeModal = () => {
        setIsOpen(false)
    }
    const muscleAreaArrayShow = () => {
        const toShow = exercise.muscleArea.map(e => {
            return t(e)
        })
        return toShow.toLocaleString().split(',').join(', ')
    }
    const styles = StyleSheet.create({
        content: {
            marginTop: 35,
            ...globalStyles.container
        },
        mediaContainer: {
            width: '100%',
            height: 220
        },
        video: {
            width: '100%',
            height: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10
        },
        image:{
            width: '100%',
            height: '100%',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10
        },
        closeBtn: {
            position: 'absolute',
            right: 5,
            top: 5,
            zIndex: 1
        },
    })
    return <Modal visible={isOpen} animationType={'slide'} onRequestClose={closeModal}>
        <AntDesign style={styles.closeBtn} name="close" size={24} color={ColorPalette[theme].mainFont}
                   onPress={closeModal}/>
        <View style={styles.content}>
            {exercise.media?.length && exercise.media?.length > 0 &&
                (exercise.media[0].type === 'image'
                        ? <View style={styles.mediaContainer}>
                            <Image style={styles.image} source={{uri: exercise.media[0].uri}}/>
                        </View>
                        : <View style={styles.mediaContainer}>
                            <Video
                                style={styles.video}
                                source={{
                                    uri: exercise.media[0].uri
                                }}
                                useNativeControls={false}
                                resizeMode={ResizeMode.COVER}
                                isLooping
                                isMuted
                                shouldPlay
                            />
                        </View>
                )
            }
            <Text style={globalStyles.h1}>{exercise.name}</Text>
            {exercise.description &&
                <Text style={globalStyles.p}>{t('description')}: {exercise.description}</Text>}
            <Text style={{...globalStyles.p}}>{t('muscle_area')}: {muscleAreaArrayShow()}</Text>
        </View>
    </Modal>
}
