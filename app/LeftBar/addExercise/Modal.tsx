import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../../../redux/store'
import {MUSCLE_AREA_TYPE} from '../../../redux/slices/exerciseSlice'
import {Modal, Pressable, ScrollView, StatusBar, Text, View} from 'react-native'
import {muscleAreaTypes} from '../../../helpers/constants'
import Checkbox from 'expo-checkbox'
import {ColorPalette} from '../../../assets/colors'
import {CustomButton} from '../../../common/Button'
import React from 'react'

export type MUSCLE_TYPE_MODAL_TYPE = {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setMuscleArea: React.Dispatch<React.SetStateAction<Array<MUSCLE_AREA_TYPE>>>,
    styles: any,
    muscleArea: Array<MUSCLE_AREA_TYPE>
}
export const MuscleTypeModal = ({isOpen, setIsOpen, styles, setMuscleArea, muscleArea}: MUSCLE_TYPE_MODAL_TYPE) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)

    const handleChangeMuscleType = (type: MUSCLE_AREA_TYPE) => {
        let newArray = muscleArea
        if (newArray.includes(type)) {
            newArray = newArray.filter(v => v !== type)
            setMuscleArea(newArray)
        } else {
            newArray = [...newArray, type]
            setMuscleArea(newArray)
        }
    }

    return <Modal visible={isOpen}
                  animationType={'slide'}
                  onRequestClose={() => {
                      setIsOpen(prev => !prev)
                  }}>
        <StatusBar barStyle={'light-content'}/>
        <View style={styles.container}>
            <ScrollView>
                {muscleAreaTypes.map((type) => {
                    return <Pressable onPress={() => handleChangeMuscleType(type)}
                                      style={styles.checkboxContainer}
                                      key={type}>
                        <Checkbox
                            value={muscleArea.includes(type)}
                            color={ColorPalette[theme].second}
                            style={styles.checkbox}
                            onValueChange={() => handleChangeMuscleType(type)}
                        />
                        <Text style={styles.checkboxSpan}>{type}</Text>
                    </Pressable>
                })}
            </ScrollView>

            <CustomButton title={'close'} onPress={() => setIsOpen(false)}/>
        </View>
    </Modal>
}
