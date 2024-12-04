import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import { LinearGradient } from 'expo-linear-gradient'
import LottieView from 'lottie-react-native';
import { TouchableOpacity } from 'react-native';


/**
 * Renders the Onboarding component.
 *
 * @param {Object} navigation - The navigation object used for navigating between screens.
 * @return {JSX.Element} The rendered Onboarding component.
 */
export default function Onbording({navigation}) {

  return (
   <View style={{flex:1}}>
     <Onboarding
        showDone={true}
        onDone={()=>navigation.navigate("HomeScreen")}
        bottomBarColor='#3e30a6'

        imageContainerStyles={{justifyContent:"center",alignItems:"center", marginTop:"-50%", height:"100%"}}
        NextButtonComponent={() =><TouchableOpacity style={styles.button}>Next</TouchableOpacity>}
    
   pages={[
      {
        backgroundColor: '#90B4BB',
        image:
        <LinearGradient
        colors={[ '#a7c6c5',
        '#92b6c2',
        '#88a4be',
        '#8c90b3',
        '#957a9d',]}
        style={[styles.background2,]} 
        start={{ x: 0.5, y: 0.5 }} 
        end={{ x: 1, y: 1 }} 
        children={<LottieView source={require("../../../assets/lottie/scanAnimation.json")} loop={true} duration={500} autoPlay/>
      }
      /> ,
        title: 
        <LinearGradient
          colors={[
            '#18329c',
            '#3e30a6',
            '#5c2cad',
            '#7724b3',
            '#9212b7',
          ]}
          style={styles.background}
          start={{ x: 1, y: 1 }} 
          end={{ x: 0, y: 0 }} 
          children={<View style={{paddingHorizontal:20, justifyContent:"center"}}>
          <Text style={{fontSize:18, color:"white",fontWeight:"bold", marginTop:20, marginBottom:20}}>stap 1</Text>
          <View style={{ }}>
              <Text style={styles.text}>
              Le lorem ipsum est, en imprimerie, une suite de mots sans 
              signification utilisée à titre provisoire pour calibrer une mise en 
              </Text>
          </View>
      </View> }
        />,
        subtitle:<></>,
      },
      {
        backgroundColor: '#90B4BB',
        image:
        <LinearGradient
        colors={[ '#a7c6c5',
        '#92b6c2',
        '#88a4be',
        '#8c90b3',
        '#957a9d',]}
        style={[styles.background]} 
        start={{ x: 0.5, y: 0.5 }} 
        end={{ x: 1, y: 1 }} 
        children={<Image source={require("../../../assets/img.png")} 
        style={{width:400, height:400, marginTop:20}}
        resizeMode='contain'/>}
      /> ,
        title: 
        <LinearGradient
          colors={[
            '#18329c',
            '#3e30a6',
            '#5c2cad',
            '#7724b3',
            '#9212b7',
          ]}
          style={styles.background}
          start={{ x: 1, y: 1 }} 
          end={{ x: 0, y: 0 }} 
          children={<View style={{paddingHorizontal:20, justifyContent:"center"}}>
          <Text style={{fontSize:18, color:"white",fontWeight:"bold", marginTop:20, marginBottom:20}}>stap 1</Text>
          <View >
              <Text style={styles.text}>
              Le lorem ipsum est, en imprimerie, une suite de mots sans 
              signification utilisée à titre provisoire pour calibrer une mise en 
              </Text>
          </View>
      </View> }
        />,
        subtitle:<></>,
      },
 
    ]}
    />
   </View>
  )
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        
      },
      background: {
        position: 'absolute',
        top: "50%",
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius:20,
        borderTopRightRadius:20
        
      },
      background2: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height:500,
        marginTop:-250
        
      },
      button:{
        marginRight:20,
        borderStyle:"solid", 
        borderWidth:1  , borderColor:"white",
         borderRadius:10, padding:10, width:100,
         alignItems:"center", textAlign:"center",
          fontSize:15, color:"white"},
    text:{fontSize:15, color:"white",fontWeight:"bold"}
     
    });
