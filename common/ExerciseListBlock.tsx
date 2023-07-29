import React from 'react'
import {EXERCISE_TYPE} from '../redux/slices/exerciseSlice'
import {Text, View, StyleSheet} from 'react-native'
import {useGlobalStyles} from '../hooks/useUI'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../redux/store'
import {ColorPalette} from '../assets/colors'
import {useTranslation} from 'react-i18next'
import {CustomButton} from './Button'

type propTypes = {
    exercise: EXERCISE_TYPE
}
export const ExerciseListBlock = ({exercise}: propTypes) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const {t} = useTranslation()

    const globalStyles = useGlobalStyles()

    const muscleAreaArrayShow = () => {
        const toShow = exercise.muscleArea.map(e => {
            return t(e)
        })
        return toShow.toLocaleString().split(',').join(', ')
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: ColorPalette[theme].fourth,
            marginVertical: 6,
            padding: 8,
            borderRadius: 5
        },
        whiteFont:{
            color: ColorPalette[theme].secondFont,
        }
    })
    return <View style={styles.container}>
        <Text style={{...globalStyles.h1, ...styles.whiteFont}}>{exercise.name}</Text>
        <Text style={{...globalStyles.p, ...styles.whiteFont}}>{t('description')}: {exercise.description}</Text>
        <Text style={{...globalStyles.p, ...styles.whiteFont}}>{t('muscle_area')}: {muscleAreaArrayShow()}</Text>
        <CustomButton title={'Delete'} onPress={()=>{}}/>
    </View>
}
