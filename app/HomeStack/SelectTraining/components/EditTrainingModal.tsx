import React, { ReactElement, useMemo, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { ColorPalette } from '../../../../assets/colors'
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { STORE_TYPE, useAppDispatch } from '../../../../redux/store'
import { changeTraining, deleteTraining, TRAINING } from '../../../../redux/slices/trainingSlice'
import { useGlobalStyles } from '../../../../hooks/useUI'
import { useTranslation } from 'react-i18next'
import { EXERCISE_TYPE, EXERCISES_BY_TYPES } from '../../../../redux/slices/exerciseSlice'
import { CustomButton } from '../../../../common/Button'
import { CustomModal } from '../../../../common/CustomModal'

type PROPS_TYPE = {
    isOpen: boolean
    closeModal: () => void
    training: TRAINING
}
export const EditTrainingModal = ({ isOpen, closeModal, training: providedTraining }: PROPS_TYPE) => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const [training, setTraining] = useState({ ...providedTraining })
    const dispatch = useAppDispatch()
    const {
        styles: { container, p, span },
    } = useGlobalStyles()
    const { t } = useTranslation()
    const isChangedForm = useMemo(() => {
        return JSON.stringify(providedTraining) !== JSON.stringify(training)
    }, [training, providedTraining])

    const styles = StyleSheet.create({
        container: {
            ...container,
        },
        p: {
            ...p,
        },
        bold: {
            fontWeight: 'bold',
        },
        closeBtn: {
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 1,
        },
        content: {
            marginTop: 20,
        },
        exerciseItem: {
            display: 'flex',
            flexDirection: 'row',
            marginVertical: 5,
            alignItems: 'center',
        },
        exerciseItemTitle: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            maxWidth: '90%',
        },
    })

    const handleCloseModal = () => {
        if (isChangedForm) {
            Alert.alert(
                'Discard changes?',
                'You have unsaved changes. Are you sure to discard them and leave the screen?',
                [
                    { text: 'Save', style: 'cancel', onPress: saveTraining },
                    { text: 'Discard', style: 'destructive', onPress: closeModal },
                ],
                {
                    cancelable: true,
                }
            )
        } else closeModal()
    }

    const handleDeleteTraining = () => {
        handleCloseModal()
        dispatch(deleteTraining(training.id))
    }
    const removeExercise = (exerciseId: string, type: EXERCISE_TYPE) => {
        setTraining((prev) => {
            const newTraining = { ...prev }
            newTraining[type] = prev[type]?.filter((e) => e.id !== exerciseId)
            return newTraining
        })
    }
    const saveTraining = () => {
        dispatch(changeTraining(training))
        closeModal()
    }

    const getContent = () => {
        const trainingsToShow: Array<ReactElement> = []
        const trainingExercises: EXERCISES_BY_TYPES = {
            press: training.press ? [...training.press] : [],
            chest: training.chest ? [...training.chest] : [],
            back: training.back ? [...training.back] : [],
            hands: training.hands ? [...training.hands] : [],
            shoulders: training.shoulders ? [...training.shoulders] : [],
            legs: training.legs ? [...training.legs] : [],
        }
        for (const exerciseType in trainingExercises) {
            if (trainingExercises[exerciseType as EXERCISE_TYPE].length) {
                trainingsToShow.push(
                    <View key={exerciseType}>
                        <Text style={styles.p}>{t(exerciseType)}:</Text>
                        {trainingExercises[exerciseType as EXERCISE_TYPE]?.length ? (
                            trainingExercises[exerciseType as EXERCISE_TYPE]?.map((item, i) => (
                                <View key={i} style={styles.exerciseItem}>
                                    <View style={styles.exerciseItemTitle}>
                                        <MaterialIcons
                                            name="chevron-right"
                                            size={24}
                                            color={ColorPalette[theme].mainFont}
                                        />
                                        <Text style={span}>{t(item.name)}</Text>
                                    </View>
                                    <MaterialIcons
                                        name="close"
                                        size={28}
                                        style={{ paddingLeft: 8 }}
                                        color={ColorPalette[theme].mainFont}
                                        onPress={() => removeExercise(item.id, exerciseType as EXERCISE_TYPE)}
                                    />
                                </View>
                            ))
                        ) : (
                            <></>
                        )}
                    </View>
                )
            }
        }
        return trainingsToShow
    }

    return (
        <CustomModal animationType="slide" onRequestClose={handleCloseModal} visible={isOpen}>
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <Text style={{ ...styles.p, ...styles.bold }}>{training.name}</Text>
                    {getContent()}
                    <CustomButton
                        title={t('delete')}
                        onPress={handleDeleteTraining}
                        icon={<MaterialIcons name="delete" size={24} color={ColorPalette[theme].mainFont} />}
                        second={true}
                    />
                    <CustomButton title={t('save')} onPress={saveTraining} disabled={!isChangedForm} />
                </ScrollView>
            </View>
        </CustomModal>
    )
}
