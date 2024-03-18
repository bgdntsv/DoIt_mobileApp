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
import { useTranslation } from 'react-i18next'
import { useColors } from '../../../../hooks/useColors'

type PROP_TYPE = {
    training: TRAINING
    setTrainingToEdit: React.Dispatch<React.SetStateAction<TRAINING | null>>
}
export const TrainingCard = ({ training, setTrainingToEdit }: PROP_TYPE) => {
    const { styles: globalStyles } = useGlobalStyles()
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const { t } = useTranslation()
    const { generateBgColor, generateFontColor } = useColors()

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
        title: {},
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        badgesBlock: {
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '90%',
            flexWrap: 'wrap',
        },
        badge: {
            padding: 8,
            margin: 5,
            height: 36,
            borderRadius: 18,
        },
    })
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={[globalStyles.p, globalStyles.whiteText, styles.title]} onPress={startTraining}>
                        {training.name}
                    </Text>
                    {training.inventory.length ? (
                        <>
                            <Text style={[globalStyles.p, globalStyles.whiteText]}>{t('inventory')}</Text>
                            <View style={styles.badgesBlock}>
                                {training.inventory.map((e, i) => {
                                    const bg = generateBgColor()
                                    const textColor = generateFontColor(bg)
                                    return (
                                        <View key={i} style={[{ backgroundColor: bg }, styles.badge]}>
                                            <Text style={[globalStyles.span, { color: textColor }]}>{t(e)}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </>
                    ) : (
                        <></>
                    )}
                    <Text style={[globalStyles.p, globalStyles.whiteText]}>{t('muscle_area')}</Text>
                    <View style={styles.badgesBlock}>
                        {training.muscleAreas.map((e, i) => {
                            const bg = generateBgColor()
                            const textColor = generateFontColor(bg)
                            return (
                                <View key={i} style={[{ backgroundColor: bg }, styles.badge]}>
                                    <Text style={[globalStyles.span, { color: textColor }]}>{t(e)}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>

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
