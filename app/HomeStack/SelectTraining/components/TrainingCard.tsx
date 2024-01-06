import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TRAINING } from '../../../../redux/slices/trainingSlice'
import { useGlobalStyles } from '../../../../hooks/useUI'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../../../../redux/store'
import { ColorPalette } from '../../../../assets/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HOME_STACK_ROUTE_PROPS } from '../../ExerciseNavigation'

type PROP_TYPE = {
    training: TRAINING
    setTrainingToEdit: React.Dispatch<React.SetStateAction<TRAINING | null>>
}
export const TrainingCard = ({ training, setTrainingToEdit }: PROP_TYPE) => {
    const { styles: globalStyles } = useGlobalStyles()
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const handleEditTraining = () => {
        setTrainingToEdit(training)
    }

    const startTraining = () => {
        navigation.navigate('Training', { trainingId: training.id })
    }

    const styles = StyleSheet.create({
        container: {
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: ColorPalette[theme].fourth,
            padding: 10,
            marginVertical: 8,
        },
        title: {
            ...globalStyles.p,
            display: 'flex',
            alignSelf: 'stretch',
            textAlign: 'center',
            color: ColorPalette[theme].secondFont,
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    })
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title} onPress={startTraining}>
                    {training.name}
                </Text>
                <MaterialIcons
                    name="edit"
                    size={24}
                    color={ColorPalette[theme].secondFont}
                    onPress={handleEditTraining}
                />
            </View>
        </View>
    )
}
