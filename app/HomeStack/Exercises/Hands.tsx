import {WorkInProgress} from '../../../common/WorkInProgress'
import {BackButtonNavigation} from '../../../common/BackButtonNavigation'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {EXERCISES_NAVIGATION_TYPES} from '../CreateExercise/CreateExercise'

export const Hands = (navigation: NativeStackScreenProps<EXERCISES_NAVIGATION_TYPES>) => {

    return <>
        <BackButtonNavigation navigation={navigation}/>
        <WorkInProgress/>
    </>
}
