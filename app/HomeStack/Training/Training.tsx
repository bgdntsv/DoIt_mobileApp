import React, { useEffect, useMemo } from 'react'
import { Text, View } from 'react-native'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { HOME_STACK_ROUTE_PROPS } from '../ExerciseNavigation'
import { STORE_TYPE } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { Loading } from '../../../common/Loading'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import { CustomButton } from '../../../common/Button'
import { useGlobalStyles } from '../../../hooks/useUI'

export const Training = () => {
    const {
        params: { trainingId },
    } = useRoute<RouteProp<HOME_STACK_ROUTE_PROPS, 'Training'>>()
    const trainings = useSelector(({ training }: STORE_TYPE) => training.trainings)
    const isFocused = useIsFocused()
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const { t } = useTranslation()
    const { styles: globalStyles } = useGlobalStyles()
    const training = useMemo(() => {
        return trainings.find((e) => e.id === trainingId)
    }, [trainingId])

    useEffect(() => {
        if (isFocused) {
            navigation.getParent()?.setOptions({ headerTitle: '' })
        }
    }, [isFocused])

    const startTraining = () => {}

    if (!training) {
        return <Loading />
    }
    return (
        <View style={globalStyles.container}>
            <Text>{training?.name}</Text>
            <CustomButton title={'Start training'} onPress={startTraining} />
        </View>
    )
}
