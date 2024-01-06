import React, { useMemo, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { MaterialIcons } from '@expo/vector-icons'
import { EXERCISE, EXERCISE_TYPE, toggleSelectedExercise } from '../../../../redux/slices/exerciseSlice'
import { STORE_TYPE, useAppDispatch } from '../../../../redux/store'
import { UI_STATE_TYPE } from '../../../../redux/slices/uiSlice'
import { useGlobalStyles } from '../../../../hooks/useUI'
import { ColorPalette } from '../../../../assets/colors'
import { ExerciseDetailsModal } from '../../../../common/ExerciseDetailsModal'

type propTypes = {
    exercise: EXERCISE
    type?: EXERCISE_TYPE
    select?: boolean
}
export const ExerciseCard = ({ exercise, type, select = false }: propTypes) => {
    const { theme } = useSelector<STORE_TYPE, UI_STATE_TYPE>(({ ui }) => ui)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { styles: globalStyles } = useGlobalStyles()
    const { allSelectedExercises } = useSelector(({ exercise }: STORE_TYPE) => exercise)
    const [isOpenedModal, setIsOpenedModal] = useState(false)

    const muscleAreaArrayShow = () => {
        const toShow = exercise.muscleArea.map((e) => {
            return t(e)
        })
        return toShow.toLocaleString().split(',').join(', ')
    }

    const cardClick = () => {
        setIsOpenedModal(true)
    }

    const selectExercise = () => {
        if (select && type) {
            dispatch(toggleSelectedExercise({ type, exercise }))
        }
    }

    const isSelected = (): boolean => {
        return !!allSelectedExercises.find((e) => e.id === exercise.id)
    }

    const palaceText = useMemo((): string => {
        const place = []
        if (exercise.gym) {
            place.push(t('gym'))
        }
        if (exercise.home) {
            place.push(t('home'))
        }
        if (exercise.outdoors) {
            place.push(t('outdoors'))
        }
        return place.toString().split(',').join(', ')
    }, [])

    const styles = StyleSheet.create({
        container: {
            backgroundColor: ColorPalette[theme].fourth,
            marginVertical: 6,
            padding: 8,
            borderRadius: 5,
        },
        title: {
            ...globalStyles.h1,
            maxWidth: '90%',
            fontWeight: 'bold',
            color: ColorPalette[theme].secondFont,
        },
        subTitle: {
            ...globalStyles.p,
            fontWeight: 'bold',
            color: ColorPalette[theme].secondFont,
        },
        text: {
            ...globalStyles.p,
            color: ColorPalette[theme].secondFont,
            paddingVertical: 5,
        },
        icon: {
            fontSize: 26,
            color: ColorPalette[theme].secondFont,
        },
        titleContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    })
    return (
        <Pressable style={styles.container} onPress={cardClick}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{exercise.name}</Text>
                {select &&
                    (isSelected() ? (
                        <MaterialIcons style={styles.icon} name="check-circle" onPress={selectExercise} />
                    ) : (
                        <MaterialIcons style={styles.icon} name="add" onPress={selectExercise} />
                    ))}
            </View>
            {palaceText.length && (
                <Text style={styles.text}>
                    <Text style={styles.subTitle}>{t('place')}:</Text> {palaceText.toLowerCase()}
                </Text>
            )}
            {exercise.inventory && (
                <Text style={styles.text}>
                    <Text style={styles.subTitle}>{t('inventory')}:</Text> {t(exercise.inventory)}
                </Text>
            )}
            <Text style={styles.text}>
                <Text style={styles.subTitle}>{t('muscle_area')}:</Text> {muscleAreaArrayShow().toLowerCase()}
            </Text>
            <ExerciseDetailsModal isOpen={isOpenedModal} setIsOpen={setIsOpenedModal} exercise={exercise} />
        </Pressable>
    )
}
