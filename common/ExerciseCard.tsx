import React, {useState} from 'react'
import {EXERCISE_NAME_TYPES, EXERCISE_TYPE, toggleSelectedExercise} from '../redux/slices/exerciseSlice'
import {Text, StyleSheet, Pressable} from 'react-native'
import {useGlobalStyles} from '../hooks/useUI'
import {useSelector} from 'react-redux'
import {STORE_TYPE, useAppDispatch} from '../redux/store'
import {ColorPalette} from '../assets/colors'
import {useTranslation} from 'react-i18next'
import {UI_STATE_TYPE} from '../redux/slices/uiSlice'
import {AntDesign} from '@expo/vector-icons'
import {ExerciseDetailsModal} from './ExerciseDetailsModal'

type propTypes = {
    exercise: EXERCISE_TYPE,
    type?: EXERCISE_NAME_TYPES,
    select?: boolean,
}
export const ExerciseCard = ({exercise, type, select = false}: propTypes) => {
    const {theme} = useSelector<STORE_TYPE, UI_STATE_TYPE>(({ui}) => ui)
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const globalStyles = useGlobalStyles()
    const {selectedExercises} = useSelector(({exercise}: STORE_TYPE) => exercise)
    const [isOpenedModal, setIsOpenedModal] = useState(false)

    const muscleAreaArrayShow = () => {
        const toShow = exercise.muscleArea.map(e => {
            return t(e)
        })
        return toShow.toLocaleString().split(',').join(', ')
    }

    const cardClick = () => {
        setIsOpenedModal(true)
    }

    const selectExercise = () => {
        if (select && type) {
            dispatch(toggleSelectedExercise({type, exercise}))
        }
    }

    const isSelected = (): boolean => {
        if (selectedExercises['chest']) {
            return !!selectedExercises['chest']?.find(e => e.id === exercise.id)
        } else {
            return false
        }
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: ColorPalette[theme].fourth,
            marginVertical: 6,
            padding: 8,
            borderRadius: 5
        },
        whiteFont: {
            color: ColorPalette[theme].secondFont
        },
        title: {
            fontWeight: 'bold'
        },
        icon: {
            position: 'absolute',
            zIndex: 1,
            right: 10,
            top: 10
        }
    })
    return <Pressable style={styles.container} onPress={cardClick}>
        {select && (isSelected()
            ? <AntDesign style={styles.icon} name="checkcircle" size={26} color={ColorPalette[theme].secondFont}
                         onPress={selectExercise}/>
            : <AntDesign style={styles.icon} name="plus" size={26} color={ColorPalette[theme].secondFont}
                         onPress={selectExercise}/>)
        }
        <Text style={{...globalStyles.p, ...styles.whiteFont, ...styles.title}}>{exercise.name}</Text>
        {exercise.description &&
            <Text style={{...globalStyles.p, ...styles.whiteFont}}>{t('description')}: {exercise.description}</Text>}
        <Text style={{...globalStyles.p, ...styles.whiteFont}}>{t('muscle_area')}: {muscleAreaArrayShow()}</Text>

        <ExerciseDetailsModal isOpen={isOpenedModal} setIsOpen={setIsOpenedModal} exercise={exercise}/>
    </Pressable>
}
