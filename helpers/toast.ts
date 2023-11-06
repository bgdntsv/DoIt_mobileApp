import Toast, { ToastShowParams } from 'react-native-toast-message'

interface TOAST_PROPS extends ToastShowParams {
    type: 'success' | 'error' | 'info'
}
export const showToast = (props: TOAST_PROPS) => {
    Toast.show({
        ...props,
        type: props.type,
    })
}
