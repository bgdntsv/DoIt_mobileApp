import {useSelector} from 'react-redux'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useCallback, useMemo} from 'react'
import {STORE_TYPE} from '../../../redux/store'
import {useGlobalStyles} from '../../../hooks/useUI'
import {ExerciseCard} from '../../../common/ExerciseCard'
import {EXERCISE_TYPE} from '../../../redux/slices/exerciseSlice'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {EXERCISES_NAVIGATION_TYPES} from '../CreateExercise/CreateExercise'
import {BackButtonNavigation} from '../../../common/BackButtonNavigation'
import {useTranslation} from 'react-i18next'
import {CustomButton} from '../../../common/Button'

export const Chest = (navigation: NativeStackScreenProps<EXERCISES_NAVIGATION_TYPES>) => {
    const exercisesState = useSelector<STORE_TYPE, Array<EXERCISE_TYPE>>(({exercise}) => exercise.exercises)
    const globalStyles = useGlobalStyles()
    const exercises = useMemo(() => exercisesState, [exercisesState])
    const {t} = useTranslation()

    const isExercisesExist = () => {
        return !!exercises.find(e => e.muscleArea.find(m => m.includes('chest', 0)))
    }

    const exercisesToShow = useCallback(
        () => {
            return exercises
                .filter(e => e.muscleArea.find(m => m.includes('chest', 0)))
                .map((e) => {
                    return <View key={e.id}>
                        <ExerciseCard exercise={e} type={'chest'} select={true}/>
                    </View>
                })
        },
        [exercises]
    )

    const goToAddExercise = () => {
        // @ts-ignore
        navigation.navigation.getParent()?.jumpTo('AddExercise')
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingVertical: 0
        }
    })

    return <ScrollView style={{...globalStyles.container, ...styles.container}}>
        <BackButtonNavigation navigation={navigation}/>
        <Text style={globalStyles.h1}>{t('chest')}</Text>
        {isExercisesExist()
            ? exercisesToShow()
            : <>
                <Text style={globalStyles.p}>{t('no_exercises')}</Text>
                <CustomButton title={'Add exercise'} onPress={goToAddExercise}/>
            </>}
    </ScrollView>
}
