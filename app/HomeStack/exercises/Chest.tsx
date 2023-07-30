import {useSelector} from 'react-redux'
import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {STORE_TYPE} from '../../../redux/store'
import {useGlobalStyles} from '../../../hooks/useUI'
import {ExerciseBlock} from '../../../common/ExerciseBlock'
import {EXERCISE_STATE_TYPE} from '../../../redux/slices/exerciseSlice'

export const Chest = () => {
    const {exercises} = useSelector<STORE_TYPE, EXERCISE_STATE_TYPE>((state) => state.exercise)
    const globalStyles = useGlobalStyles()

    const isExercisesExist = () => {
        return !!exercises.find(e => e.muscleArea.find(m => m.includes('chest', 0)))
    }

    const exercisesToShow = () => {
        return exercises
            .filter(e => e.muscleArea.find(m => m.includes('chest', 0)))
            .map((e) => {
                return <View key={e.id}>
                    <ExerciseBlock exercise={e}/>
                </View>
            })
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 45
        }
    })

    return <View style={{...styles.container, ...globalStyles.container}}>
        {isExercisesExist()
            ? exercisesToShow()
            : <Text style={globalStyles.h1}>No exercises</Text>}
    </View>
}
