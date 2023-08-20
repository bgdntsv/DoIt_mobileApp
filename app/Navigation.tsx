import {useSelector} from 'react-redux'
import {Platform, useWindowDimensions, StatusBar} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import {Settings} from './Settings/Settings'
import {NavigationContainer} from '@react-navigation/native'
import {ColorPalette} from '../assets/colors'
import {STORE_TYPE, useAppDispatch} from '../redux/store'
import {Notifications} from './Notifications/Notifications'
import {ExerciseNavigation} from './HomeStack/ExerciseNavigation'
import React, {useLayoutEffect, useState} from 'react'
import {getFilesPermissions, readExercisesFile, readTrainingsFile, readUiFile} from '../helpers/fileHelper'
import {changeLanguage, changeTheme, LANGUAGE_TYPE} from '../redux/slices/uiSlice'
import * as ScreenOrientation from 'expo-screen-orientation'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {Login} from './Login/Login'
import AddExercise from './AddExercise/AddExercise'
import {useTranslation} from 'react-i18next'
import {getLocales} from 'expo-localization'
import {initExerciseState} from '../redux/slices/exerciseSlice'
import {useFonts} from 'expo-font'
import {Loading} from '../common/Loading'
import {initTrainingsState} from '../redux/slices/trainingSlice'

export type DRAWER_PROP_TYPES = {
    'Home': undefined,
    'Login': undefined,
    'AddExercise': undefined,
    'Notifications': undefined,
    'Settings': undefined
}
export const Navigation = () => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const {t} = useTranslation()
    const Drawer = createDrawerNavigator()
    const {languageCode} = getLocales()[0]
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const dimensions = useWindowDimensions()
    const [fontsLoaded] = useFonts({
        'Inter-Regular': require('../assets/fonts/inter/Inter-Regular.ttf'),
    })
    const init = async () => {
        setIsLoading(true)
        if (Platform.OS !== 'web') {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
            await getFilesPermissions()
            const uiFile = await readUiFile()
            if (uiFile) {
                if (!uiFile.theme) {
                    dispatch(changeTheme('white'))
                } else {
                    dispatch(changeTheme(uiFile.theme))
                }
                if (!uiFile.language) {
                    dispatch(changeLanguage(languageCode as LANGUAGE_TYPE))
                } else {
                    dispatch(changeLanguage(uiFile.language))
                }
            }
            const exercises = await readExercisesFile()
            if (exercises) {
                dispatch(initExerciseState(exercises))
            }
            const trainings = await readTrainingsFile()
            if (trainings) {
                dispatch(initTrainingsState(trainings))
            }
        }
        setIsLoading(false)
    }

    useLayoutEffect(() => {
        init()
    }, [])

    if (isLoading || !fontsLoaded) {
        return <Loading/>
    }
    return <NavigationContainer theme={{
        dark: false,
        colors: {
            primary: ColorPalette[theme].mainFont,
            background: ColorPalette[theme].main,
            text: ColorPalette[theme].secondFont,
            card: ColorPalette[theme].fourth,
            notification: ColorPalette[theme].secondFont,
            border: ColorPalette[theme].secondFont
        }
    }}>
        <StatusBar barStyle={'light-content'} backgroundColor={ColorPalette[theme].fourth}/>

        <Drawer.Navigator
            initialRouteName={'DoIt'}
            backBehavior={'firstRoute'}
            screenOptions={({route}) => {
                return {
                    headerTintColor: ColorPalette[theme].secondFont,
                    drawerInactiveTintColor: ColorPalette[theme].secondFont,
                    drawerActiveBackgroundColor: ColorPalette[theme].main,
                    drawerActiveTintColor: ColorPalette[theme].mainFont,
                    drawerType: dimensions.width >= 768 ? 'permanent' : 'front',
                    drawerIcon: ({size, focused}) => {
                        const color = focused ? ColorPalette[theme].mainFont : ColorPalette[theme].secondFont
                        switch (route.name) {
                            case 'Home': {
                                return <AntDesign name={'home'} size={size} color={color}/>
                            }
                            case 'Settings': {
                                return <AntDesign name={'setting'} size={size} color={color}/>
                            }
                            case 'Notifications': {
                                return <AntDesign name={'bells'} size={size} color={color}/>
                            }
                            case 'Login': {
                                return <AntDesign name="user" size={size} color={color}/>
                            }
                            case 'AddExercise': {
                                return <AntDesign name="pluscircleo" size={size} color={color}/>
                            }
                            default: {
                                return <AntDesign name={'question'} size={size} color={color}/>
                            }
                        }
                    }
                }
            }}>
            <Drawer.Screen name={'Home'} options={{title: t('main'), headerTitle: ''}} component={ExerciseNavigation}/>
            <Drawer.Screen name={'Login'} options={{title: t('login')}} component={Login}/>
            <Drawer.Screen name={'AddExercise'} options={{title: t('add_exercise')}} component={AddExercise}/>
            <Drawer.Screen name={'Notifications'} options={{title: t('notifications')}} component={Notifications}/>
            <Drawer.Screen name={'Settings'} options={{title: t('settings')}} component={Settings}/>
        </Drawer.Navigator>
    </NavigationContainer>
}
