import { ImageSourcePropType, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalStyles } from '../../../hooks/useUI'
import { ExerciseTypeBlock } from '../Exercises/ExerciseTypeBlock'
import { useTranslation } from 'react-i18next'
import pressImg from '../../../assets/images/abs.webp'
import chestImg from '../../../assets/images/chest_muscles.png'
import { BackButtonNavigation } from '../../../common/BackButtonNavigation'
import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../../../redux/store'
import { EXERCISE_NAME_TYPES } from '../../../redux/slices/exerciseSlice'
import { AntDesign } from '@expo/vector-icons'
import { ColorPalette } from '../../../assets/colors'
import { ConfirmTrainingModal } from './ConfirmTrainingModal'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { HOME_STACK_ROUTE_PROPS } from '../ExerciseNavigation'

export const CreateTraining = () => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const { selectedExercises } = useSelector(
        ({ exercise }: STORE_TYPE) => exercise
    )
    const { t } = useTranslation()
    const globalStyles = useGlobalStyles()
    const [isOpenModal, setIsOpenModal] = useState(false)
    const navigation =
        useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            navigation
                .getParent()
                ?.setOptions({ headerTitle: t('select_trainings_zone') })
        }
    }, [isFocused])

    const exercises: Array<{
        name: EXERCISE_NAME_TYPES
        img: ImageSourcePropType | string
    }> = [
        {
            name: 'press',
            img: pressImg,
        },
        {
            name: 'chest',
            img: chestImg,
        },
        {
            name: 'legs',
            img: '',
        },
        {
            name: 'hands',
            img: '',
        },
        {
            name: 'shoulders',
            img: '',
        },
        {
            name: 'back',
            img: '',
        },
    ]
    const confirmTraining = () => {
        setIsOpenModal(true)
    }
    const styles = StyleSheet.create({
        container: {
            ...globalStyles.container,
            marginVertical: 0,
        },
        startButton: {
            position: 'absolute',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
        },
        headerButton: {
            paddingHorizontal: 16,
            paddingVertical: 5,
        },
        fixedScreen: {
            position: 'absolute',
            bottom: 12,
            right: 12,
            backgroundColor: ColorPalette[theme].second,
            height: 60,
            width: 60,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 28,
        },
    })
    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <BackButtonNavigation />
                </View>
                {exercises.map((e) => (
                    <ExerciseTypeBlock
                        key={e.name}
                        title={e.name}
                        isSelected={!!selectedExercises[e.name]}
                        select={true}
                        img={e.img}
                    />
                ))}
            </ScrollView>

            {Object.keys(selectedExercises).length > 0 && (
                <View style={styles.fixedScreen}>
                    <AntDesign
                        name="play"
                        size={54}
                        color={ColorPalette[theme].secondFont}
                        onPress={confirmTraining}
                    />
                </View>
            )}

            <ConfirmTrainingModal
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
            />
        </>
    )
}
