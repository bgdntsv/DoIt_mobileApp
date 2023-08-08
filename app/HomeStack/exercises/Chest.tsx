import {useSelector} from 'react-redux'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useCallback, useMemo, useState} from 'react'
import {STORE_TYPE} from '../../../redux/store'
import {useGlobalStyles} from '../../../hooks/useUI'
import {ExerciseBlock} from '../../../common/ExerciseBlock'
import {EXERCISE_TYPE} from '../../../redux/slices/exerciseSlice'

export const Chest = () => {
    const exercisesState = useSelector<STORE_TYPE, Array<EXERCISE_TYPE>>(({exercise}) => exercise.exercises)
    const globalStyles = useGlobalStyles()
    const exercises = useMemo(() => exercisesState, [exercisesState])
    const [, setCount] = useState(0)//need it for refreshing screen on deleting exercise

    const isExercisesExist = () => {
        return !!exercises.find(e => e.muscleArea.find(m => m.includes('chest', 0)))
    }

    const exercisesToShow = useCallback(
        () => {
            return exercises
                .filter(e => e.muscleArea.find(m => m.includes('chest', 0)))
                .map((e) => {
                    return <View key={e.id}>
                        <ExerciseBlock exercise={e} setCount={setCount}/>
                    </View>
                })
        },
        [exercises]
    )

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 45
        }
    })

    return <ScrollView style={{...styles.container, ...globalStyles.container}}>
            {isExercisesExist()
                ? exercisesToShow()
                : <Text style={globalStyles.h1}>No exercises</Text>}
        </ScrollView>
}
