import {Text, View, StyleSheet} from 'react-native'

const Login = () => {
    return <View style={styles.container}>
        <Text>Login page</Text>
    </View>
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default Login
