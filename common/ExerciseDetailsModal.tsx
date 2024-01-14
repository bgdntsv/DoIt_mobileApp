import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { deleteExercise, EXERCISE } from '../redux/slices/exerciseSlice'
import { useGlobalStyles } from '../hooks/useUI'
import { useTranslation } from 'react-i18next'
import { ShowMediaLink } from './media/ShowMediaLink'
import { CustomModal } from './CustomModal'
import { useAppDispatch } from '../redux/store'
import { CustomButton } from './Button'

type PROP_TYPES = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    exercise: EXERCISE
}
export const ExerciseDetailsModal = ({ isOpen, setIsOpen, exercise }: PROP_TYPES) => {
    const { styles: globalStyles } = useGlobalStyles()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const closeModal = () => {
        setIsOpen(false)
    }
    const muscleAreaArrayShow = () => {
        const toShow = exercise.muscleArea.map((e) => {
            return t(e)
        })
        return toShow.toLocaleString().split(',').join(', ')
    }

    const getMediaContent = () => {
        if (!exercise.media) {
            return <></>
        }
        return <ShowMediaLink link={exercise.media} />
    }
    const handleDeleteExercise = () => {
        dispatch(deleteExercise(exercise.id))
    }

    const styles = StyleSheet.create({
        content: {
            marginTop: 35,
            ...globalStyles.container,
        },
    })
    return (
        isOpen && (
            <CustomModal visible={isOpen} animationType={'slide'} onRequestClose={closeModal}>
                <View style={styles.content}>
                    {getMediaContent()}
                    <Text style={globalStyles.h1}>{exercise.name}</Text>
                    {exercise.description && (
                        <Text style={globalStyles.p}>
                            {t('description')}: {exercise.description}
                        </Text>
                    )}
                    <Text style={{ ...globalStyles.p }}>
                        {t('muscle_area')}: {muscleAreaArrayShow()}
                    </Text>
                </View>
                <CustomButton
                    title={exercise.isOwn ? t('delete') : t('hide_this_exercise')}
                    onPress={handleDeleteExercise}
                />
            </CustomModal>
        )
    )
}
