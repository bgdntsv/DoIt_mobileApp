import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { changeLanguage, changeTheme, LANGUAGE_TYPE, THEME_TYPE } from '../../redux/slices/uiSlice'
import { STORE_TYPE, useAppDispatch } from '../../redux/store'
import { useTranslation } from 'react-i18next'
import { useGlobalStyles } from '../../hooks/useUI'
import { ColorPalette } from '../../assets/colors'
import { CustomSelect } from '../../common/CustomSelect'
import { ItemValue } from '@react-native-picker/picker/typings/Picker'

export const Settings = () => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation()
    const { theme, language } = useSelector(({ ui }: STORE_TYPE) => ui)
    const { styles: globalStyles } = useGlobalStyles()
    const handleChangeTheme = (itemValue: ItemValue) => {
        dispatch(changeTheme(itemValue as THEME_TYPE))
    }
    const handleChangeLanguage = async (language: ItemValue) => {
        dispatch(changeLanguage(language as LANGUAGE_TYPE))
    }
    const styles = StyleSheet.create({
        itemContainer: {
            padding: 12,
            borderRadius: 10,
            backgroundColor: ColorPalette[theme].main,
            marginBottom: 20,
            shadowColor: ColorPalette[theme].mainFont,
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 12,
        },
    })

    return (
        <View style={globalStyles.container}>
            <View style={styles.itemContainer}>
                <Text style={globalStyles.span1}>{t('select_theme')}</Text>
                <CustomSelect
                    items={[
                        { label: t('white'), value: 'white' },
                        { label: t('pink'), value: 'pink' },
                    ]}
                    selectedValue={theme}
                    onValueChange={handleChangeTheme}
                />
            </View>
            <View style={styles.itemContainer}>
                <Text style={globalStyles.span1}>{t('select_language')}</Text>
                <CustomSelect
                    items={[
                        { label: 'Українська', value: 'ua' },
                        { label: 'English', value: 'en' },
                    ]}
                    selectedValue={language}
                    onValueChange={handleChangeLanguage}
                />
            </View>
        </View>
    )
}
