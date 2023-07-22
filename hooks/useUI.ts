import {useSelector} from 'react-redux'
import {UI_STATE_TYPE} from '../redux/slices/uiSlice'

export const useUI = () => {
    const state: UI_STATE_TYPE = useSelector(({ui})=>ui)
    return {theme: state.theme}
}
