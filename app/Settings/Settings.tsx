import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {useSelector} from 'react-redux'
import {changeLanguage, changeTheme, LANGUAGE_TYPE, THEME_TYPE} from '../../redux/slices/uiSlice'
import {STORE_TYPE, useAppDispatch} from '../../redux/store'
import {Picker} from '@react-native-picker/picker'
import {useTranslation} from 'react-i18next'
import {useGlobalStyles} from '../../hooks/useUI'
import {ColorPalette} from '../../assets/colors'

export const Settings = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation()
    const {theme, language} = useSelector(({ui}: STORE_TYPE) => ui)
    const globalStyles = useGlobalStyles()
    const handleChangeTheme = (itemValue: THEME_TYPE) => {
        dispatch(changeTheme(itemValue))
    }
    const handleChangeLanguage = async (language: LANGUAGE_TYPE) => {
        dispatch(changeLanguage(language))
    }
    const styles = StyleSheet.create({
        itemContainer: {
            padding: 12,
            borderRadius: 10,
            backgroundColor: ColorPalette[theme].main,
            marginBottom: 20,
            shadowColor: ColorPalette[theme].mainFont,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            elevation: 12
        }
    })

    return <View style={globalStyles.container}>
        <View style={styles.itemContainer}>
            <Text>{t('select_theme')}</Text>
            <Picker
                mode={'dialog'}
                selectedValue={theme}
                onValueChange={handleChangeTheme}>
                <Picker.Item label={t('white')} value="white"/>
                <Picker.Item label={t('pink')} value="pink"/>
            </Picker>
        </View>
        <View style={styles.itemContainer}>
            <Text>{t('select_language')}</Text>
            <Picker
                mode={'dialog'}
                selectedValue={language}
                onValueChange={handleChangeLanguage}>
                <Picker.Item label="Українська" value="ua"/>
                <Picker.Item label="English" value="en"/>
            </Picker>
        </View>
    </View>
}
