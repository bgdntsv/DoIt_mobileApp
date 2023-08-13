import React from 'react'
import {EXERCISE_NAME_TYPES, EXERCISE_TYPE, toggleSelectedExercise} from '../redux/slices/exerciseSlice'
import {Text, StyleSheet, Pressable} from 'react-native'
import {useGlobalStyles} from '../hooks/useUI'
import {useSelector} from 'react-redux'
import {STORE_TYPE, useAppDispatch} from '../redux/store'
import {ColorPalette} from '../assets/colors'
import {useTranslation} from 'react-i18next'
import {UI_STATE_TYPE} from '../redux/slices/uiSlice'
import {AntDesign} from '@expo/vector-icons'

type propTypes = {
    exercise: EXERCISE_TYPE,
    type?: EXERCISE_NAME_TYPES,
    select?: boolean,
}
export const ExerciseBlock = ({exercise, type, select = false}: propTypes) => {
    const {theme} = useSelector<STORE_TYPE, UI_STATE_TYPE>(({ui}) => ui)
    const {t} = useTranslation()
    const dispatch = useAppDispatch()
    const globalStyles = useGlobalStyles()
    const {selectedExercises} = useSelector(({exercise}: STORE_TYPE) => exercise)

    const muscleAreaArrayShow = () => {
        const toShow = exercise.muscleArea.map(e => {
            return t(e)
        })
        return toShow.toLocaleString().split(',').join(', ')
    }

    const handleClick = () => {
        if(select && type){
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
        checkBox: {
            position: 'absolute',
            zIndex: 1,
            right: 10,
            top: 10
        }
    })
    return <Pressable style={styles.container} onPress={handleClick}>
        {select && isSelected()
            && <AntDesign style={styles.checkBox} name="checkcircle" size={20} color={ColorPalette[theme].secondFont}/>
        }
        <Text style={{...globalStyles.h1, ...styles.whiteFont}}>{exercise.name}</Text>
        <Text style={{...globalStyles.p, ...styles.whiteFont}}>{t('description')}: {exercise.description}</Text>
        <Text style={{...globalStyles.p, ...styles.whiteFont}}>{t('muscle_area')}: {muscleAreaArrayShow()}</Text>
        {/*<CustomButton title={'Delete'} onPress={handleDeleteExercise}/>*/}
    </Pressable>
}
