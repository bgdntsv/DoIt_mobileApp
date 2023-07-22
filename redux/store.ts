import {configureStore} from '@reduxjs/toolkit'
import uiReducer, {UI_STATE_TYPE} from './slices/uiSlice'
import exerciseReducer, {EXERCISE_STATE_TYPE} from './slices/exerciseSlice'

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        exercise: exerciseReducer
    }
})
export default store
export type STORE_TYPE = {
    ui: UI_STATE_TYPE,
    exercise: EXERCISE_STATE_TYPE
}
export type AppDispatch = typeof store.dispatch

