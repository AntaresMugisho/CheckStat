import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from '../screens/HomeScreen/HomeScreen'
// import Onbording from '../screens/Onbording/Onbording'
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import SelectOptions from '../screens/selectOptionScreen'
import WriteNFCPage from '../component/WritecardNfc/WriteCardNf'

const Stack = createStackNavigator()

const NavigationScreen = () => {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name='Write ID into the Card' component={WriteNFCPage} />
      <Stack.Screen name="SelectOptions" component={SelectOptions} options={{headerShown:false}}/>
    </Stack.Navigator>
   </NavigationContainer>
  )
}

export default NavigationScreen

