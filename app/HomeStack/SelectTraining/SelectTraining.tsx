import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { STORE_TYPE } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { TrainingCard } from './components/TrainingCard'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BackButtonNavigation } from '../../../common/BackButtonNavigation'
import { useGlobalStyles } from '../../../hooks/useUI'
import { CustomButton } from '../../../common/Button'
import { HOME_STACK_ROUTE_PROPS } from '../ExerciseNavigation'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { EditTrainingModal } from './components/EditTrainingModal'
import { TRAINING } from '../../../redux/slices/trainingSlice'

export const SelectTraining = () => {
    const trainings = useSelector((state: STORE_TYPE) => state.training.trainings)
    const { styles: globalStyles } = useGlobalStyles()
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const { t } = useTranslation()
    const isFocused = useIsFocused()
    const [selectedTrainingToEdit, setSelectedTrainingToEdit] = useState<TRAINING | null>(null)

    useEffect(() => {
        if (isFocused) {
            navigation.getParent()?.setOptions({ headerTitle: t('select_training') })
        }
    }, [isFocused])

    const closeEditModal = () => {
        setSelectedTrainingToEdit(null)
    }

    const goToAddTraining = () => {
        navigation.navigate('Create-training', {
            comesFromSelectTraining: true,
        })
    }
    const styles = StyleSheet.create({
        container: {
            marginVertical: 0,
        },
    })

    return (
        <ScrollView style={{ ...globalStyles.container, ...styles.container }}>
            <BackButtonNavigation />
            {trainings.map((e) => (
                <TrainingCard training={e} key={e.id} setTrainingToEdit={setSelectedTrainingToEdit} />
            ))}
            <View>
                <CustomButton title={t('create_training')} onPress={goToAddTraining} />
            </View>

            {selectedTrainingToEdit !== null && (
                <EditTrainingModal isOpen={true} training={selectedTrainingToEdit} closeModal={closeEditModal} />
            )}
        </ScrollView>
    )
}
