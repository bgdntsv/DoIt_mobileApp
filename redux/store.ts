import { configureStore } from '@reduxjs/toolkit'
import uiReducer, { UI_STATE_TYPE } from './slices/uiSlice'
import exerciseReducer, { EXERCISE_STATE } from './slices/exerciseSlice'
import { useDispatch } from 'react-redux'
import trainingsSlice, { TRAININGS_STATE } from './slices/trainingSlice'

export const store = configureStore({
    reducer: {
        ui: uiReducer,
        exercise: exerciseReducer,
        training: trainingsSlice,
    },
})
export default store
export type STORE_TYPE = {
    ui: UI_STATE_TYPE
    exercise: EXERCISE_STATE
    training: TRAININGS_STATE
}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
