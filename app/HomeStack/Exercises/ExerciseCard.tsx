import React, {useState} from 'react'
import {EXERCISE_NAME_TYPES, EXERCISE_TYPE, toggleSelectedExercise} from '../../../redux/slices/exerciseSlice'
import {Text, StyleSheet, Pressable} from 'react-native'
import {useGlobalStyles} from '../../../hooks/useUI'
import {useSelector} from 'react-redux'
import {STORE_TYPE, useAppDispatch} from '../../../redux/store'
import {ColorPalette} from '../../../assets/colors'
import {useTranslation} from 'react-i18next'
import {UI_STATE_TYPE} from '../../../redux/slices/uiSlice'
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
        if (type && selectedExercises[type]) {
            return !!selectedExercises[type]?.find(e => e.id === exercise.id)
        } else {
            return false
        }
    }

    const getPlaceText = (): string => {
        return `${exercise.gym ? t('gym') : ''}${(exercise.home || exercise.outdoors) ? ', ' : ''}${exercise.home ? t('home') : ''}${exercise.outdoors ? ', ' : ''}${exercise.outdoors ? t('outdoors') : ''}`
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: ColorPalette[theme].fourth,
            marginVertical: 6,
            padding: 8,
            borderRadius: 5
        },
        title: {
            ...globalStyles.h1,
            fontWeight: 'bold',
            color: ColorPalette[theme].secondFont
        },
        subTitle: {
            ...globalStyles.p,
            fontWeight: 'bold',
            color: ColorPalette[theme].secondFont
        },
        text: {
            ...globalStyles.p,
            color: ColorPalette[theme].secondFont,
            paddingVertical: 5
        },
        icon: {
            position: 'absolute',
            zIndex: 1,
            right: 10,
            top: 10
        },
    })
    return <Pressable style={styles.container} onPress={cardClick}>
        {select && (isSelected()
            ? <AntDesign style={styles.icon} name="checkcircle" size={26} color={ColorPalette[theme].secondFont}
                         onPress={selectExercise}/>
            : <AntDesign style={styles.icon} name="plus" size={26} color={ColorPalette[theme].secondFont}
                         onPress={selectExercise}/>)
        }
        <Text style={styles.title}>{exercise.name}</Text>
        {(exercise.gym || exercise.outdoors || exercise.home)
            && <Text style={styles.text}>
                <Text style={styles.subTitle}>{t('place')}:</Text> {getPlaceText().toLowerCase()}
            </Text>}
        {exercise.description &&
            <Text style={styles.text}>
                <Text style={styles.subTitle}>{t('description')}:</Text> {exercise.description}
            </Text>}
        <Text style={styles.text}>
            <Text style={styles.subTitle}>{t('muscle_area')}:</Text> {muscleAreaArrayShow().toLowerCase()}
        </Text>
        <ExerciseDetailsModal isOpen={isOpenedModal} setIsOpen={setIsOpenedModal} exercise={exercise}/>
    </Pressable>
}
