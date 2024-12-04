import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import CryptoJS from 'react-native-crypto-js'
import CustomModal from '../modal/Modal';

NfcManager.start();
const WriteNFCPage = () => {
  const [matricule, setMatricule] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [MessageModal, setMessageModal] = useState('');
  const [ModalChild, setModalChild]  = useState("")


 
  const handleNFCWrite = async () => {
    try {
  
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const cipherText = CryptoJS.AES.encrypt(matricule, "S3cr3tK3y").toString()
      const bytes = Ndef.encodeMessage([Ndef.androidApplicationRecord("com.checkstat"), Ndef.textRecord(cipherText)]);
  
      if (bytes) {
      await NfcManager.ndefHandler 
          .writeNdefMessage(bytes); 
          setModalChild(<Image source={require("../../../assets/protection.png")} style = {styles.ModalChild}/>)
          setMessageModal("Matricule écrit avec succès dans la carte !")
          setOpenModal(true)
        
        result = true;
      }
    } catch (ex) {
      if (ex.message == "java.io.IOException") {
        setModalChild(<Image source={require("../../../assets/error.png")} style = {styles.ModalChild}/>)
        setMessageModal("Impossible d'écrire le matricule !\nLa carte est peut-être protégée en écriture.")
        setOpenModal(true)
      }
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Écrire le Matricule</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le matricule"
        value={matricule}
        onChangeText={text => {
          setMatricule(text)
        }}
      />
      <TouchableOpacity style={styles.button} onPress={handleNFCWrite}>
        <Text style={styles.buttonText}>Écrire le Matricule</Text>
      </TouchableOpacity>
      <CustomModal content={MessageModal} openModal={openModal} children={ModalChild}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ModalChild:{
    width:100,
    height:100,
    resizeMode:"cover"
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color:"black"
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WriteNFCPage;
