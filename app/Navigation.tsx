import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useDispatch, useSelector} from 'react-redux'
import {Text, View, Platform} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import {Settings} from './bottomScreens/Settings'
import {NavigationContainer} from '@react-navigation/native'
import {ColorPalette} from '../assets/colors'
import {AppDispatch, STORE_TYPE} from '../redux/store'
import {Notifications} from './bottomScreens/Notifications'
import {Home} from './HomeStack/Home'
import React, {useLayoutEffect, useState} from 'react'
import {readExercisesFile, readUiFile} from '../helpers/fileHelper'
import {changeLanguage, changeTheme, LANGUAGE_TYPE} from '../redux/slices/uiSlice'
import * as ScreenOrientation from 'expo-screen-orientation'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Login from './LeftBar/Login'
import AddExercise from './LeftBar/addExercise/AddExercise'
import { useTranslation } from 'react-i18next';
import { useLocales } from 'expo-localization';
import {initExerciseState} from '../redux/slices/exerciseSlice'

export const Navigation = () => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)
    const {t} = useTranslation()
    const Tab = createBottomTabNavigator()
    const Drawer = createDrawerNavigator();
    const {languageCode} = useLocales()[0]
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsLoading] = useState(true)
    const init = async () => {
        setIsLoading(true)
        if(Platform.OS !== 'web'){
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
            const uiFile = await readUiFile()
            if(uiFile){
                if(!uiFile.theme){
                    dispatch(changeTheme('white'))
                }else {
                    dispatch(changeTheme(uiFile.theme))
                }
                if(!uiFile.language){
                    dispatch(changeLanguage(languageCode as LANGUAGE_TYPE))
                }else{
                    dispatch(changeLanguage(uiFile.language))
                }
            }
            const exercises = await readExercisesFile()
            if(exercises){
                dispatch(initExerciseState(exercises))
            }
        }
        setIsLoading(false)
    }

    useLayoutEffect(() => {
       init()
    }, [])

    const Main = () => <Tab.Navigator
        sceneContainerStyle={{backgroundColor: ColorPalette[theme].main}}
        screenOptions={({route}) => ({
            tabBarIcon: ({size, focused}) => {
                const color = focused ? ColorPalette[theme].main : ColorPalette[theme].third
                switch (route.name) {
                    case 'HomeStack': {
                        return <AntDesign name={'home'} size={size} color={color}/>
                    }
                    case 'Settings': {
                        return <AntDesign name={'setting'} size={size} color={color}/>
                    }
                    case 'Notifications': {
                        return <AntDesign name={'bells'} size={size} color={color}/>
                    }
                    default: {
                        return <AntDesign name={'question'} size={size} color={color}/>
                    }
                }
            },
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: ColorPalette[theme].fourth
            },
            headerBackground: () => {
                return <View style={{backgroundColor: ColorPalette[theme].fourth}}></View>
            },
            headerTintColor: ColorPalette[theme].mainFont,
            headerShown: false
        })
        }
    >
        <Tab.Screen name={'HomeStack'} component={Home}/>
        <Tab.Screen name={'Notifications'} component={Notifications}/>
        <Tab.Screen name={'Settings'} component={Settings}/>
    </Tab.Navigator>

    if(isLoading){
        return <Text>Loading...</Text>
    }
    return <NavigationContainer>
        {/*<BottomTabs/>*/}
        <Drawer.Navigator>
            <Drawer.Screen name={'DoIt'} options={{title: t('main')}} component={Main}/>
            <Drawer.Screen name={'Login'} options={{title: t('login')}} component={Login}/>
            <Drawer.Screen name={'AddExercise'} options={{title: t('add_exercise')}} component={AddExercise}/>
        </Drawer.Navigator>
    </NavigationContainer>
}
