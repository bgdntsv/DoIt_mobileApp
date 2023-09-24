import Toast from 'react-native-toast-message'

export type TOAST_PROPS = {
    type: 'success' | 'error' | 'info'
    text1: string
    text2?: string
    position?: 'top' | 'bottom'
    visibilityTime?: number
    autoHide?: boolean
    topOffset?: number
    bottomOffset?: number
    keyboardOffset?: number
    onShow?: () => void
    onHide?: () => void
    onPress?: () => void
}
export const showToast = (props: TOAST_PROPS) => {
    Toast.show({
        type: props.type,
        text1: props.text1,
        text2: props.text2,
        position: props.position,
        visibilityTime: props.visibilityTime,
        autoHide: props.autoHide,
        topOffset: props.topOffset,
        bottomOffset: props.bottomOffset,
        keyboardOffset: props.keyboardOffset,
        onShow: props.onShow,
        onHide: props.onHide,
        onPress: props.onPress,
    })
}
