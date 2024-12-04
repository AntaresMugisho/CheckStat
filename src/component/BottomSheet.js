import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet'
import LottieView from 'lottie-react-native'
import NFCScanner from './test'
import CustomModal from './modal/Modal'
import { Image } from 'react-native'


const BottomSheet = ({refRBSheet, GetuserData}) => {
const [Check, setCheck] = useState(true)
const [lottieUri, setLottieUri] = useState(
  require("../../assets/lottie/scanAnimation.json")  
)
const [usersData, setUsersData] = useState([])
const [openModal, setOpenModal] = useState(false);
const [MessageModal, setMessageModal] = useState('');
const [ModalChild, setModalChild]  = useState("")
function Userdata(data){
  if (data.data) {
    setUsersData([...usersData,data.data])
    GetuserData(data)
    setTimeout(()=>{
      setLottieUri(require("../../assets/lottie/scanAnimation.json") )
      setCheck(true)
    },2800)
}

if (data.data.lenght != 0) {
  setCheck(false)
  if (data.data[0]?.valable == "1") {
    setLottieUri(require("../../assets/lottie/Animation - 1716103807127.json"))
  } else if(data.data[0]?.valable == "0") {
     setLottieUri(require("../../assets/lottie/Animation - 1716103885448.json"))
  }else{
    setModalChild(<Image source={require("../../assets/error.png")} style = {styles.ModalChild}/>)
    setMessageModal(<><Text style={{textAlign:"center"}}>Une erreur innatendue s'est produite ! </Text>
    <Text style={{textAlign:"center"}}>Fermez puis reessayez</Text></>)
     setOpenModal(true)
  }
} else{
  setModalChild(<Image source={require("../../assets/error.png")} style = {styles.ModalChild}/>)
  setMessageModal("Identifiant non trouvé")
   setOpenModal(true)
}
}
  return (
    <RBSheet
    ref={refRBSheet}
    useNativeDriver={true}
    customStyles={{
      wrapper: {
        backgroundColor: 'transparent',
      },
      draggableIcon: {
        backgroundColor: '#000',
      },
      container:{
        backgroundColor:"#1a2a3c",
        borderTopEndRadius:20,
        borderTopStartRadius:20,
        height:"40%"
      }
    }}
    customModalProps={{
      animationType: 'slide',
      statusBarTranslucent: true,
    }}
    customAvoidingViewProps={{
      enabled: false,
    }}
    children={
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
              <LottieView source={lottieUri} style={{height:200, width:200}}
              autoPlay
              loop
              />
              <Text style={styles.title}>{Check?"Placer la carte derrière le télephone pour scanner...":"Scan en cours"}</Text>
      {Check?<NFCScanner Data={Userdata}/>:""}
      <CustomModal content={MessageModal} openModal={openModal} children={ModalChild}/>
      </View>
    }
>

  </RBSheet>
  )
}
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
     image: {
       width: 350,
       height: 400,
       resizeMode: 'contain',
       marginTop: -70
     },
    ModalChild:{
      width:100,
      height:100,
      resizeMode:"cover"
    }

    });
export default BottomSheet