import {StyleSheet} from 'react-native'

export const globalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    container: {
        minHeight: 200,
        borderRadius: 5,
        overflow: 'hidden',
        marginVertical: 8
    },
    title:{
        fontFamily: 'Inter-Bold',
        fontSize: 28
    },
    p:{
        fontFamily: 'Inter-Regular',
        fontSize: 20
    },
    span:{
        fontFamily: 'Inter-Light',
        fontSize: 16
    }
})
