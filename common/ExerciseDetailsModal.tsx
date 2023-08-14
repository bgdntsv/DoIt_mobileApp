import React from 'react'
import {Image, Modal, StyleSheet, Text, View} from 'react-native'
import {EXERCISE_TYPE} from '../redux/slices/exerciseSlice'
import {CustomButton} from './Button'
import {useGlobalStyles} from '../hooks/useUI'
import {ResizeMode, Video} from 'expo-av'
import {useTranslation} from 'react-i18next'

type PROP_TYPES = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    exercise: EXERCISE_TYPE
}
export const ExerciseDetailsModal = ({isOpen, setIsOpen, exercise}: PROP_TYPES) => {
    const globalStyles = useGlobalStyles()
    const {t} = useTranslation()
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
        }
    })
    return <Modal visible={isOpen} animationType={'slide'}>
        <View style={globalStyles.container}>
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
            <CustomButton title={'close'} onPress={closeModal}/>
        </View>
    </Modal>
}
