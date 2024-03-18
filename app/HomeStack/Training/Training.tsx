import React, { useEffect, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { HOME_STACK_ROUTE_PROPS } from '../ExerciseNavigation'
import { STORE_TYPE } from '../../../redux/store'
import { useSelector } from 'react-redux'
import { Loading } from '../../../common/Loading'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTranslation } from 'react-i18next'
import { CustomButton } from '../../../common/Button'
import { useGlobalStyles } from '../../../hooks/useUI'
import { useColors } from '../../../hooks/useColors'

export const Training = () => {
    const {
        params: { trainingId },
    } = useRoute<RouteProp<HOME_STACK_ROUTE_PROPS, 'Training'>>()
    const trainings = useSelector(({ training }: STORE_TYPE) => training.trainings)
    const isFocused = useIsFocused()
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const { t } = useTranslation()
    const { styles: globalStyles } = useGlobalStyles()
    const { generateBgColor, generateFontColor } = useColors()
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
    const styles = StyleSheet.create({
        inventoryBlock: {
            display: 'flex',
            flexDirection: 'row',
        },
        inventoryItem: {
            padding: 8,
            margin: 5,
            height: 36,
            borderRadius: 18,
        },
    })
    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.h1}>{training?.name}</Text>
            {training.inventory.length ? (
                <>
                    <Text style={globalStyles.p}>{t('inventory')}</Text>
                    <View style={styles.inventoryBlock}>
                        {training.inventory.map((e, i) => {
                            const bg = generateBgColor()
                            const textColor = generateFontColor(bg)
                            return (
                                <View key={i} style={[{ backgroundColor: bg }, styles.inventoryItem]}>
                                    <Text style={[globalStyles.span, { color: textColor }]}>{e}</Text>
                                </View>
                            )
                        })}
                    </View>
                </>
            ) : (
                <></>
            )}

            <CustomButton title={'Start training'} onPress={startTraining} />
        </View>
    )
}
