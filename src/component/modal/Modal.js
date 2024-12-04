import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({ children, content, openModal, handleBtnName, handleBtnAction }) => {
  const [isModalVisible, setModalVisible] = useState(openModal);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    setModalVisible(openModal);
  }, [openModal]);

  return (
    <Modal isVisible={isModalVisible} onBackdropPress={toggleModal} style={styles.modal}>
      <View style={styles.modalContent}>
        {children}
        <Text style={styles.modalText}>{content}</Text>
        <View style={styles.buttonContainer}>

            <TouchableOpacity onPress={handleBtnName?handleBtnAction:""} style={[styles.button,{opacity:handleBtnName?1:0 }]}>
              <Text style={styles.buttonText}>{handleBtnName}</Text>
            </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal} style={styles.button}>
            <Text style={styles.buttonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    width:"100%"
  },
  modalContent: {
    backgroundColor: '#1a2a3c',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  modalText: {
    fontSize: 18,
    paddingVertical: 12,
    color: 'white', 
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CustomModal;
