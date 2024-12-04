import { View, Text, StyleSheet,Image, Button, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
// import { LinearGradient } from 'expo-linear-gradient'

export default function WelcomeScreen({navigation}) {

    setTimeout(() => {
        navigation.navigate("SelectOptions")
    },2000);

  return (
        <View style={styles.container}>
        <View style={{width:"100%"}} >
            <Text style={{fontSize:16, color:"white", textAlign:"center", fontWeight:"100"}}>Welcome in</Text>
            <View style={{flexDirection:"row", justifyContent:"center",gap:10}}>
                <View>
                </View>
                <View style={styles.logo}>
                    <Text style={[styles.textLogo, styles.check]}>Check</Text>
                    <Text style={[styles.textLogo, styles.stat]}>Stat</Text>
                </View>
            </View>
        </View>
        <View>
          <ActivityIndicator/>
        </View>
        <Text style={{color:"#ddd", fontSize:12, marginBottom:"-50%", fontWeight:"300", marginTop:40}}>
            Powered by FongoLab
        </Text>
        </View>
        // } 
        // />
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        // justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#1a2a3c",
        paddingTop:"70%"
    },
    logo:{
        flexDirection:"row",
        marginBottom:"90%"

    },
    textLogo:{
        fontSize:40,
    },
    check:{
        
        fontWeight:"bold"
    },
    stat:{
        color: 'rgb(61, 174, 178)',

    }
})