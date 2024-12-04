
import React, {useEffect, useRef, useState} from 'react';
import {View, Button, Text, StyleSheet, Image, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native';
import BottomSheet from '../../component/BottomSheet';
import nfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import NFCScanner from '../../component/test';

const HomeScreen= () => {
  const [data, setData] = useState([])
  const refRBSheet = useRef();
  const GetUsersData = (usersData)=>{
    setData(usersData)
  }

  const renderItem = ({ item }) =>{ 
    const InfoPayement = item["infos de payement"]
    const typeInfo = InfoPayement? item["infos de payement"][0]?.type:"";
    
    
    return(
        <View style={styles.itemContainer}>
          <Text style={styles.subtitle}>Nom: {item.nom}</Text>
          <Text style={styles.subtitle}>Département: {item.departement}</Text>
          <Text style={styles.subtitle}>Matricule: {item.matricule}</Text>
          <Text style={[styles.valable, item.valable === "1" ? styles.valableYes : styles.valableNo]}>
            {item.valable === "1" ? "Autorisé" : "Non autorisé"}
          </Text>
         {InfoPayement? <View style={styles.itemContainer}>
         <View style ={{flexDirection:"row", gap:10, alignItems:"center"}}>
         <Text style={styles.subtitle}>Type de Dette:</Text>
            <View>
                {Object.entries(typeInfo).map(([key, value]) => (
            <Text key={key} style={styles.subtitle}>
              {value}
        </Text>
      ))}
            </View>
         </View>
          <Text style={styles.subtitle}>Montant: {item["infos de payement"][0]?.montant}</Text>
          <Text style={styles.subtitle}>Payé le: {new Date(item["infos de payement"]?.payéLe).toLocaleDateString()}</Text>
          <Text style={styles.subtitle}>Reste: {item["infos de payement"][0]?.reste}</Text>

        </View>:""}
        </View>
      
  )}

  return (
    <View style={styles.contener}>
        {data.data?   <FlatList
        data={data.data}
        renderItem={renderItem}
        keyExtractor={item => item.matricule}
      />:<Image source={require('../../../assets/homescan.png')} style={styles.image}/>}
      <TouchableOpacity 
        style={[data.data?{marginBottom:200}:"",styles.button]}
        onPress={() =>{
          refRBSheet.current.open()
        }}
      >
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>Scan card</Text>
      </TouchableOpacity>
      <BottomSheet refRBSheet={refRBSheet} GetuserData={GetUsersData}/>
    </View>
  );

};

const styles = StyleSheet.create({
scanAnimation: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#18329c',
  padding: 20,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  shadowColor: '#000',
}
,
button:{
    borderStyle:"solid", borderWidth:1  , borderColor:"#0b22e6",
 borderRadius:10, padding:10, alignItems: 'center', justifyContent: 'center',
 width: 150, color: '#0b22e6',},
contener: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
 image: {
   width: 350,
   height: 400,
   resizeMode: 'contain',
   marginTop: -70
 },
 itemContainer: {
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 8,
  marginVertical: 8,
  flex:1,
  width:'100%'
},
title: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 4,
  color:"black"
},
subtitle: {
  fontSize: 14,
  color: '#555',
  marginBottom: 4,
},
valable: {
  fontSize: 14,
  marginTop: 8,
  padding: 4,
  borderRadius: 4,
  textAlign: 'center',
  overflow: 'hidden',
},
valableYes: {
  backgroundColor: '#4CAF50',
  color: '#fff',
},
valableNo: {
  backgroundColor: '#F44336',
  color: '#fff',
},
});

export default HomeScreen;