import {View} from 'react-native'
import {useGlobalStyles} from '../../../hooks/useUI'
import {WorkInProgress} from '../../../common/WorkInProgress'
import {BackButtonNavigation} from '../../../common/BackButtonNavigation'
import React from 'react'

export const GenerateTraining = () => {
    const globalStyles = useGlobalStyles()
    return <View style={globalStyles.container}>
        <BackButtonNavigation/>
        <WorkInProgress/>
    </View>
}
