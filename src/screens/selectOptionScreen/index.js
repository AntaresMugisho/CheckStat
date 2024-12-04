import { Icon } from '@rneui/base';
import LottieView from 'lottie-react-native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SelectOptions = ({navigation}) => {
  const handleCheckCard = () => {
   navigation.navigate("Home")
   console.log("click");
  };

  const handleWriteID = () => {
    navigation.navigate("Write ID into the Card")
  };

  return (
    <View style={styles.container}>
      
        <LottieView source={require("../../../assets/lottie/Animation - 1716104171648 (1).json")} style={{width:300, height:300}}
        autoPlay
        />
     <View>
     <TouchableOpacity style={styles.button} onPress={handleCheckCard}>
        <Text style={styles.buttonText}> Check Card</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleWriteID}>
        <Text style={styles.buttonText}>Write ID Into the Card</Text>
      </TouchableOpacity>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1a2a3c',
    gap:200
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginVertical: 10,
    width:250,
    borderWidth:1,
    borderColor:"#ddd"
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:"center"
  },
});

export default SelectOptions;
