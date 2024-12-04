import {StyleSheet, Text, View} from 'react-native'
import WelcomeScreen from './src/screens/WelcomeScreen/WelcomeScreen'
import HomeScreen from './src/screens/HomeScreen/HomeScreen'
import NavigationScreen from './src/navigation/NavigationScreen'
import NFCScreen from './src/component/test'
import CustomModal from './src/component/modal/Modal'


export default function App(){
return(
    <View style={styles.container}>
     <NavigationScreen/>

    </View>
    )
}



const styles = StyleSheet.create({
    container:{
        flex:1,
    }
})