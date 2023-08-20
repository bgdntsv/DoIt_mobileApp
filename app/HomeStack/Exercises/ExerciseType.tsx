import {useSelector} from 'react-redux'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import React, {useCallback, useEffect, useMemo} from 'react'
import {STORE_TYPE} from '../../../redux/store'
import {useGlobalStyles} from '../../../hooks/useUI'
import {ExerciseCard} from './ExerciseCard'
import {EXERCISE_TYPE} from '../../../redux/slices/exerciseSlice'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {BackButtonNavigation} from '../../../common/BackButtonNavigation'
import {useTranslation} from 'react-i18next'
import {CustomButton} from '../../../common/Button'
import {HOME_STACK_ROUTE_PROPS} from '../ExerciseNavigation'
import {RouteProp, useIsFocused, useNavigation, useRoute} from '@react-navigation/native'

export const ExerciseType = () => {
    const exercisesState = useSelector<STORE_TYPE, Array<EXERCISE_TYPE>>(({exercise}) => exercise.exercises)
    const globalStyles = useGlobalStyles()
    const exercises = useMemo(() => exercisesState, [exercisesState])
    const {t} = useTranslation()
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const route = useRoute<RouteProp<HOME_STACK_ROUTE_PROPS, 'Exercises-type'>>()
    const exercisesType = route.params.exerciseType
    const isFocused = useIsFocused()

    useEffect(()=>{
        if(isFocused){
            navigation.getParent()?.setOptions({headerTitle: t('select_exercise')})
        } else {
            navigation.getParent()?.setOptions({headerTitle: ''})
        }
    }, [isFocused])

    const isExercisesExist = () => {
        return !!exercises.find(e => e.muscleArea.find(m => m.includes(exercisesType, 0)))
    }

    const exercisesToShow = useCallback(
        () => {
            return exercises
                .filter(e => e.muscleArea.find(m => m.includes(exercisesType, 0)))
                .sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
                .map((e) => {
                    return <View key={e.id}>
                        <ExerciseCard exercise={e} type={exercisesType} select={true}/>
                    </View>
                })
        },
        [exercises]
    )

    const goToAddExercise = () => {
        navigation.getParent()?.navigate('AddExercise')
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginVertical: 0
        }
    })

    return <ScrollView style={{...globalStyles.container, ...styles.container}}>
        <BackButtonNavigation/>
        <Text style={globalStyles.h1}>{t(exercisesType)}</Text>
        {isExercisesExist()
            ? exercisesToShow()
            : <>
                <Text style={globalStyles.p}>{t('no_exercises')}</Text>
                <CustomButton title={t('add_exercise')} onPress={goToAddExercise}/>
            </>
        }
    </ScrollView>
}
