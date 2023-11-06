import { useSelector } from 'react-redux'
import { STORE_TYPE } from '../../redux/store'
import { Pressable, ScrollView, Text, View } from 'react-native'
import {
    backAreaTypes,
    chestAreaTypes,
    handsAreaTypes,
    legsAreaTypes,
    MUSCLE_AREA_TYPE,
    pressAreaTypes,
    shouldersAreaTypes,
} from '../../helpers/types'
import Checkbox from 'expo-checkbox'
import { ColorPalette } from '../../assets/colors'
import { CustomButton } from '../../common/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { CustomModal } from '../../common/CustomModal'

export type MUSCLE_TYPE_MODAL_TYPE = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    setMuscleArea: React.Dispatch<React.SetStateAction<Array<MUSCLE_AREA_TYPE>>>
    styles: any
    muscleArea: Array<MUSCLE_AREA_TYPE>
}
export const MuscleTypeModal = ({
    isOpen,
    setIsOpen,
    styles,
    setMuscleArea,
    muscleArea,
}: MUSCLE_TYPE_MODAL_TYPE) => {
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

    return (
        <CustomModal
            visible={isOpen}
            animationType={'slide'}
            onRequestClose={() => {
                setIsOpen((prev) => !prev)
            }}
            showCloseIcon={false}
        >
            <View style={styles.container}>
                <ScrollView>
                    <Text style={styles.span}>{t('chest')}</Text>
                    <View style={styles.checkboxes}>
                        {chestAreaTypes.map((type) => {
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
                                        onValueChange={() =>
                                            handleChangeMuscleType(type)
                                        }
                                    />
                                    <Text style={styles.checkboxSpan}>
                                        {t(type)}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>

                    <Text style={styles.span}>{t('hands')}</Text>
                    <View style={styles.checkboxes}>
                        {handsAreaTypes.map((type) => {
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
                                        onValueChange={() =>
                                            handleChangeMuscleType(type)
                                        }
                                    />
                                    <Text style={styles.checkboxSpan}>
                                        {t(type)}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>

                    <Text style={styles.span}>{t('back')}</Text>
                    <View style={styles.checkboxes}>
                        {backAreaTypes.map((type) => {
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
                                        onValueChange={() =>
                                            handleChangeMuscleType(type)
                                        }
                                    />
                                    <Text style={styles.checkboxSpan}>
                                        {t(type)}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>

                    <Text style={styles.span}>{t('shoulders')}</Text>
                    <View style={styles.checkboxes}>
                        {shouldersAreaTypes.map((type) => {
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
                                        onValueChange={() =>
                                            handleChangeMuscleType(type)
                                        }
                                    />
                                    <Text style={styles.checkboxSpan}>
                                        {t(type)}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>

                    <Text style={styles.span}>{t('press')}</Text>
                    <View style={styles.checkboxes}>
                        {pressAreaTypes.map((type) => {
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
                                        onValueChange={() =>
                                            handleChangeMuscleType(type)
                                        }
                                    />
                                    <Text style={styles.checkboxSpan}>
                                        {t(type)}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>

                    <Text style={styles.span}>{t('legs')}</Text>
                    <View style={styles.checkboxes}>
                        {legsAreaTypes.map((type) => {
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
                                        onValueChange={() =>
                                            handleChangeMuscleType(type)
                                        }
                                    />
                                    <Text style={styles.checkboxSpan}>
                                        {t(type)}
                                    </Text>
                                </Pressable>
                            )
                        })}
                    </View>
                </ScrollView>
                <View style={{ marginTop: 10 }}>
                    <CustomButton
                        title={'close'}
                        onPress={() => setIsOpen(false)}
                    />
                </View>
            </View>
        </CustomModal>
    )
}
