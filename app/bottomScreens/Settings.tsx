import {View, Text, StyleSheet} from 'react-native'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {changeLanguage, changeTheme, LANGUAGE_TYPE, THEME_TYPE} from '../../redux/slices/uiSlice'
import {AppDispatch, STORE_TYPE} from '../../redux/store'
import {Picker} from '@react-native-picker/picker'
import {ColorPalette} from '../../assets/colors'
import {globalStyles} from '../../assets/globalStyles'
import {useTranslation} from 'react-i18next'

export const Settings = () => {
    const dispatch = useDispatch<AppDispatch>()
    const {t, i18n} = useTranslation()
    const {theme, language} = useSelector(({ui}: STORE_TYPE) => ui)
    const handleChangeTheme = (itemValue: THEME_TYPE) => {
        dispatch(changeTheme(itemValue))
    }
    const handleChangeLanguage = async (language: LANGUAGE_TYPE) => {
        dispatch(changeLanguage(language))
        await i18n.changeLanguage(language)
    }
    const styles = StyleSheet.create({
        container: {
            paddingVertical: 8,
            margin: 5
        }
    })

    return <View style={globalStyles.mainContainer}>
        <View style={styles.container}>
            <Text style={globalStyles.p}>{t('select_theme')}</Text>
            <Picker
                mode={'dialog'}
                selectedValue={theme}
                onValueChange={handleChangeTheme}>
                <Picker.Item style={{backgroundColor: ColorPalette['white'].main}}
                             color={ColorPalette['white'].mainFont}
                             label={t('white')}
                             value="white"/>
                <Picker.Item style={{backgroundColor: ColorPalette['pink'].main}}
                             color={ColorPalette['pink'].mainFont}
                             label={t('pink')}
                             value="pink"/>
            </Picker>
        </View>
        <View style={styles.container}>
            <Text style={globalStyles.p}>{t('select_language')}</Text>
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
