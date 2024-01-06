import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AntDesign, EvilIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { EXERCISE_TYPE } from '../../../../redux/slices/exerciseSlice'
import { STORE_TYPE } from '../../../../redux/store'
import { UI_STATE_TYPE } from '../../../../redux/slices/uiSlice'
import { useGlobalStyles } from '../../../../hooks/useUI'
import { HOME_STACK_ROUTE_PROPS } from '../../ExerciseNavigation'
import { ColorPalette } from '../../../../assets/colors'

type PROP_TYPES = {
    title: EXERCISE_TYPE
    isSelected?: boolean
    img?: ImageSourcePropType | string
}
export const ExerciseTypeCard = ({ isSelected, title, img }: PROP_TYPES) => {
    const { theme } = useSelector<STORE_TYPE, UI_STATE_TYPE>(({ ui }) => ui)
    const { styles: globalStyles } = useGlobalStyles()
    const { t } = useTranslation()
    const navigation = useNavigation<NativeStackNavigationProp<HOME_STACK_ROUTE_PROPS>>()
    const route = useRoute<RouteProp<HOME_STACK_ROUTE_PROPS, 'Create-training'>>()

    const goToExercises = () => {
        navigation.navigate('Exercises-type', {
            exerciseType: title,
            comesFromSelectTraining: route.params?.comesFromSelectTraining,
        })
    }

    const styles = StyleSheet.create({
        container: {
            borderRadius: 8,
            height: 220,
            marginVertical: 8,
            overflow: 'hidden',
        },
        containerTitle: {
            color: ColorPalette[theme].secondFont,
        },
        bottom: {
            backgroundColor: ColorPalette[theme].fourth,
            paddingVertical: 8,
            paddingHorizontal: 16,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            position: 'absolute',
            width: '100%',
            bottom: 0,
        },
        img: {
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
        },
        withoutImg: {
            display: 'flex',
            alignItems: 'center',
            paddingTop: 70,
            height: '100%',
            backgroundColor: ColorPalette[theme].second,
        },
        icon: {
            position: 'absolute',
            zIndex: 1,
            right: 10,
            top: 10,
        },
        image: {
            display: 'flex',
        },
    })

    return (
        <View style={styles.container}>
            <Pressable onPress={goToExercises} style={styles.image}>
                {isSelected && (
                    <AntDesign
                        style={styles.icon}
                        name="checkcircle"
                        size={20}
                        color={ColorPalette[theme].secondFont}
                    />
                )}
                {img && typeof img !== 'string' ? (
                    <Image style={styles.img} source={img} />
                ) : (
                    <View style={styles.withoutImg}>
                        <EvilIcons name="image" size={52} color={ColorPalette[theme].secondFont} />
                    </View>
                )}
            </Pressable>

            <View style={styles.bottom}>
                <Text style={{ ...globalStyles.p, ...styles.containerTitle }}>{t(title)}</Text>
            </View>
        </View>
    )
}
