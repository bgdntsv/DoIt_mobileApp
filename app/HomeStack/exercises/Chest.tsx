import {useSelector} from 'react-redux'
import {StyleSheet, Text, View} from 'react-native'
import React from 'react'
import {STORE_TYPE} from '../../../redux/store'
import {useGlobalStyles} from '../../../hooks/useUI'
import {ExerciseListBlock} from '../../../common/ExerciseListBlock'

const Chest = () => {
    const {exercises} = useSelector(({exercise}: STORE_TYPE) => exercise)
    const globalStyles = useGlobalStyles()
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 45
        }
    })

    return <View style={{...styles.container, ...globalStyles.container}}>
        {exercises.length > 0
            ? exercises
                .filter(e => e.muscleArea.find(m => m.includes('chest', 0)))
                .map((e) => {
                    return <View key={e.id}>
                        <ExerciseListBlock exercise={e}/>
                    </View>
                })
            : <Text style={globalStyles.h1}>No exercises</Text>}
    </View>
}
export default Chest
