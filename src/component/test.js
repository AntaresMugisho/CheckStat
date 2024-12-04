import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import NfcManager, { Ndef, NfcTech } from 'react-native-nfc-manager';
import CryptoJS from 'react-native-crypto-js';
import axios from 'axios';
import CustomModal from './modal/Modal';
import { Image } from 'react-native';

NfcManager.start();

function NFCScanner({ Data }) {
  const [userData, setUserData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [MessageModal, setMessageModal] = useState('');
  const [ModalChild, setModalChild]  = useState("")
  const [showHandleBtn, setShowHandleBtn] = useState(false)

  async function readNdef() {
    await NfcManager.requestTechnology(NfcTech.Ndef);
    try {
      const tag = await NfcManager.getTag();
      if (tag && tag.ndefMessage && tag.ndefMessage.length > 0) {
        const payload = tag.ndefMessage[1].payload;
        const cipherText = Ndef.text.decodePayload(payload).toString();
        const decrypted = CryptoJS.AES.decrypt(cipherText, 'S3cr3tK3y');
        const uid = decrypted.toString(CryptoJS.enc.Utf8);

        if (uid) {
          let link = "http://check-stat.is-best.net/api/etudiants/" + uid
          axios.get(link)
            .then(({ data }) => {
              Data(data);
            })
            .catch((error) => {
              // console.log(error)
              Data({data: []});
              Alert.alert("Erreur de connexion", "Vérifiez votre connexion internet !")
              // setOpenModal(true)
              // setModalChild(<Image source={require("../../assets/protection.png")} style = {styles.ModalChild}/>)
              // setMessageModal(<Text style={{textAlign:"center"}}>Message d'erreur</Text>)
            });
        } else {
          Data({ data: [] });
          setModalChild(<Image source={require("../../assets/protection.png")} style = {styles.ModalChild}/>)
          setMessageModal("Carte invalide', 'Carte invalide ou matricule corrompu.")
          setOpenModal(true)
        }
      } else {
        Data({ data: [] });
        setModalChild(<Image source={require("../../assets/protection.png")} style = {styles.ModalChild}/>)
        setMessageModal("Erreur', 'Tag NFC non valide ou message NDEF vide.")
        setOpenModal(true)
      }
    } catch (ex) {
              Data({ data: [] });
      if (ex.message === 'Cannot convert undefined value to object') {
      } else {
        Data({ data: [] });
        setModalChild(<Image source={require("../../assets/protection.png")} style = {styles.ModalChild}/>)
        setMessageModal("Erreur', 'Erreur lors de la lecture de la carte.")
        setOpenModal(true)
      }
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  useEffect(() => {
    async function checkNFCEnabled() {
      const isEnabled = await NfcManager.isEnabled();
      if (!isEnabled) {
        setModalChild(<Image source={require("../../assets/settings.png")} style = {styles.ModalChild}/>)
        setMessageModal("NFC désactivé\nAllez dans les paramètres pour activer le NFC.")
        setOpenModal(true)
        setShowHandleBtn(true)
      }
    }

    checkNFCEnabled();
    readNdef();
  }, []);

      return( 
        <View style={{justifyContent:"center", alignItems:"center", }}>
        {openModal ? <CustomModal content={MessageModal} openModal={openModal}
         children={ModalChild}
         handleBtnAction={showHandleBtn ? () => NfcManager.goToNfcSetting():""} handleBtnName={showHandleBtn ? "Activer NFC" : ""}/> : ""}
        </View>
      )
}
const styles = StyleSheet.create({
  ModalChild:{
    width:100,
    height:100,
    resizeMode:"cover"
  },
})
export default NFCScanner;
