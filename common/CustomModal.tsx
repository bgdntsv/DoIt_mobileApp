import React from 'react'
import {
    Modal,
    ModalProps, Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
} from 'react-native'
import {ColorPalette} from '../assets/colors'
import {AntDesign} from '@expo/vector-icons'
import {useSelector} from 'react-redux'
import {STORE_TYPE} from '../redux/store'
import Constants from 'expo-constants';
import Toast from 'react-native-toast-message'

interface PROP_TYPES extends ModalProps {
    showCloseIcon?: boolean
}

export const CustomModal = ({showCloseIcon = true, ...prop}: PROP_TYPES) => {
    const {theme} = useSelector(({ui}: STORE_TYPE) => ui)

    const styles = StyleSheet.create({
        modal: {
            backgroundColor: ColorPalette[theme].main,
            height: '100%',
            paddingTop: 8,
            position: 'relative'
        },
        modalCloseIcon: {
            position: 'absolute',
            top: Platform.OS === 'ios' ? Constants.statusBarHeight - 10 : 10,
            right: 10,
            zIndex: 1,
            backgroundColor: ColorPalette[theme].main,
            padding: 3,
            borderRadius: 15,
        },
    })
    return (
        <Modal {...prop}>
            <SafeAreaView style={styles.modal}>
                {showCloseIcon && (
                    <AntDesign
                        name="closecircleo"
                        size={24}
                        color={ColorPalette[theme].mainFont}
                        style={styles.modalCloseIcon}
                        onPress={prop.onRequestClose}
                    />
                )}
                <ScrollView>{prop.children}</ScrollView>
            </SafeAreaView>
            <Toast />
        </Modal>
    )
}
