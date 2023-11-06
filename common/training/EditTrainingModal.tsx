import React, { ReactElement } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { ColorPalette } from '../../assets/colors'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { STORE_TYPE, useAppDispatch } from '../../redux/store'
import {
    deleteTraining,
    removeExerciseFromTraining,
    TRAINING,
} from '../../redux/slices/trainingSlice'
import { useGlobalStyles } from '../../hooks/useUI'
import { useTranslation } from 'react-i18next'
import {
    EXERCISE_TYPE,
    EXERCISES_BY_TYPES,
} from '../../redux/slices/exerciseSlice'
import { CustomButton } from '../Button'
import { CustomModal } from '../CustomModal'

type PROPS_TYPE = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    training: TRAINING
}
export const EditTrainingModal = ({
    isOpen,
    setIsOpen,
    training,
}: PROPS_TYPE) => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const dispatch = useAppDispatch()
    const { container, p, span } = useGlobalStyles()
    const { t } = useTranslation()

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
    })

    const closeModal = () => {
        // Alert.alert(
        //     'Discard changes?',
        //     'You have unsaved changes. Are you sure to discard them and leave the screen?',
        //     [
        //         {text: 'Don\'t leave', style: 'cancel'},
        //         {text: 'Discard', style: 'destructive', onPress: () => setIsOpen(false)}
        //     ],
        //     {
        //         cancelable: true
        //     }
        // )
        setIsOpen(false)
    }

    const handleDeleteTraining = () => {
        closeModal()
        dispatch(deleteTraining(training.id))
    }
    const removeExercise = (id: string, type: EXERCISE_TYPE) => {
        dispatch(
            removeExerciseFromTraining({
                trainingId: training.id,
                exerciseId: id,
                exerciseType: type,
            })
        )
    }

    const getContent = () => {
        const trainingsToShow: Array<ReactElement> = []
        const trainingExercises: EXERCISES_BY_TYPES = {
            press: training.press ? [...training.press] : undefined,
            chest: training.chest ? [...training.chest] : undefined,
            back: training.back ? [...training.back] : undefined,
            hands: training.hands ? [...training.hands] : undefined,
            shoulders: training.shoulders ? [...training.shoulders] : undefined,
            legs: training.legs ? [...training.legs] : undefined,
        }
        for (const exerciseType in trainingExercises) {
            if (trainingExercises[exerciseType as EXERCISE_TYPE]) {
                trainingsToShow.push(
                    <View key={exerciseType}>
                        <Text style={styles.p}>{t(exerciseType)}:</Text>
                        {trainingExercises[exerciseType as EXERCISE_TYPE]
                            ?.length ? (
                            trainingExercises[
                                exerciseType as EXERCISE_TYPE
                            ]?.map((item, i) => (
                                <View key={i} style={styles.exerciseItem}>
                                    <MaterialIcons
                                        name="chevron-right"
                                        size={24}
                                        color={ColorPalette[theme].mainFont}
                                    />
                                    <Text style={span}>{t(item.name)}</Text>
                                    <MaterialIcons
                                        name="close"
                                        size={28}
                                        style={{ paddingLeft: 8 }}
                                        color={ColorPalette[theme].mainFont}
                                        onPress={() =>
                                            removeExercise(
                                                item.id,
                                                exerciseType as EXERCISE_TYPE
                                            )
                                        }
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
        <CustomModal
            animationType="slide"
            onRequestClose={() => setIsOpen(false)}
            visible={isOpen}
        >
            <View style={styles.container}>
                <ScrollView style={styles.content}>
                    <Text style={{ ...styles.p, ...styles.bold }}>
                        {training.name}
                    </Text>
                    {getContent()}
                    <CustomButton
                        title={t('delete')}
                        onPress={handleDeleteTraining}
                        icon={
                            <MaterialIcons
                                name="delete"
                                size={24}
                                color={ColorPalette[theme].mainFont}
                            />
                        }
                        second={true}
                    />
                </ScrollView>
            </View>
        </CustomModal>
    )
}
