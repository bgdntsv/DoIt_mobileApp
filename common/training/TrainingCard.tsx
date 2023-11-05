import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TRAINING_TYPE } from '../../redux/slices/trainingSlice'
import { useGlobalStyles } from '../../hooks/useUI'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../../redux/store'
import { ColorPalette } from '../../assets/colors'
import { MaterialIcons } from '@expo/vector-icons'
import { EditTrainingModal } from './EditTrainingModal'

type PROP_TYPE = {
    training: TRAINING_TYPE
}
export const TrainingCard = ({ training }: PROP_TYPE) => {
    const globalStyles = useGlobalStyles()
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleEditTraining = () => {
        setIsModalOpen(true)
    }

    const styles = StyleSheet.create({
        container: {
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: ColorPalette[theme].fourth,
            padding: 10,
            marginVertical: 8,
        },
        whiteFont: {
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
                <Text style={{ ...globalStyles.p, ...styles.whiteFont }}>
                    {training.name}
                </Text>
                <MaterialIcons
                    name="edit"
                    size={24}
                    color={ColorPalette[theme].secondFont}
                    onPress={handleEditTraining}
                />
            </View>
            <EditTrainingModal
                isOpen={isModalOpen}
                training={training}
                setIsOpen={setIsModalOpen}
            />
        </View>
    )
}
