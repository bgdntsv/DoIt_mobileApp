import React, { useMemo, useState } from 'react'
import { Text, View } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/native'
import { HOME_STACK_ROUTE_PROPS } from '../ExerciseNavigation'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../../../redux/store'
import { Loading } from '../../../common/Loading'
import { ProgressStepBar } from './components/ProgressStepBar'

export const TrainingProcess = () => {
    const {
        params: { trainingId },
    } = useRoute<RouteProp<HOME_STACK_ROUTE_PROPS, 'Training'>>()
    const trainings = useSelector(({ training }: STORE_TYPE) => training.trainings)
    const [currentExercise, setCurrentExercise] = useState(0)
    const training = useMemo(() => {
        return trainings.find((e) => e.id === trainingId)
    }, [trainingId])
    if (!training) {
        return <Loading />
    }
    return (
        <View>
            <ProgressStepBar currentStep={currentExercise} stepsCount={training.exercisesCount} />
            <Text>{training?.name}</Text>
        </View>
    )
}
