import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../../redux/store'
import { Pressable, ScrollView, Text, View } from 'react-native'
import {
    BACK_AREA_TYPE,
    CHEST_AREA_TYPE,
    HANDS_AREA_TYPE,
    LEGS_AREA_TYPE,
    MUSCLE_AREA_TYPE,
    PRESS_AREA_TYPE,
    SHOULDERS_AREA_TYPE,
} from '../../helpers/types'
import Checkbox from 'expo-checkbox'
import { ColorPalette } from '../../assets/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomModal } from '../../common/CustomModal'

type PROP_TYPE = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setMuscleArea: React.Dispatch<React.SetStateAction<Array<MUSCLE_AREA_TYPE>>>
    styles: any
    muscleArea: Array<MUSCLE_AREA_TYPE>
}
export const MuscleTypeModal = ({ isOpen, setIsOpen, styles, setMuscleArea, muscleArea }: PROP_TYPE) => {
    const { theme } = useSelector(({ ui }: STORE_TYPE) => ui)
    const { t } = useTranslation()

    const handleChangeMuscleType = (type: MUSCLE_AREA_TYPE) => {
        let newArray = muscleArea
        if (newArray.includes(type)) {
            newArray = newArray.filter((v) => v !== type)
            setMuscleArea(newArray)
        } else {
            newArray = [...newArray, type]
            setMuscleArea(newArray)
        }
    }
    type MUSCLES_OBJECT = {
        chest: Array<CHEST_AREA_TYPE>
        press: Array<PRESS_AREA_TYPE>
        hands: Array<HANDS_AREA_TYPE>
        shoulders: Array<SHOULDERS_AREA_TYPE>
        back: Array<BACK_AREA_TYPE>
        legs: Array<LEGS_AREA_TYPE>
    }
    const muscleTypes: MUSCLES_OBJECT = {
        chest: ['chest_base', 'chest_up', 'chest_down'],
        press: ['press_base', 'press_down', 'press_up', 'press_side'],
        hands: ['biceps', 'triceps', 'forearm'],
        shoulders: ['shoulders_base', 'shoulders_front', 'shoulders_back'],
        back: ['back_base', 'back_up', 'back_down'],
        legs: ['leg_base', 'leg_front', 'leg_back', 'leg_calf', 'leg_ass'],
    }

    const getContent = () => {
        const keys = Object.keys(muscleTypes)
        const values = Object.values(muscleTypes)
        return values.map((e, i) => (
            <View key={i}>
                <Text style={styles.span}>{t(keys[i])}</Text>
                <View style={styles.checkboxes}>
                    {e.map((type) => {
                        return (
                            <Pressable
                                onPress={() => handleChangeMuscleType(type)}
                                style={styles.checkboxContainer}
                                key={type}
                            >
                                <Checkbox
                                    value={muscleArea.includes(type)}
                                    color={ColorPalette[theme].second}
                                    style={styles.checkbox}
                                    onValueChange={() => handleChangeMuscleType(type)}
                                />
                                <Text style={styles.checkboxSpan}>{t(type)}</Text>
                            </Pressable>
                        )
                    })}
                </View>
            </View>
        ))
    }

    return (
        <CustomModal
            visible={isOpen}
            animationType={'slide'}
            onRequestClose={() => {
                setIsOpen((prev) => !prev)
            }}
        >
            <View style={styles.container}>
                <ScrollView>{getContent()}</ScrollView>
            </View>
        </CustomModal>
    )
}
