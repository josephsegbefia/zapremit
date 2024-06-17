import { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { height: screenHeight } = Dimensions.get('window');
const modalHeight = screenHeight / 2;

const reasons = [
  {
    id: 1,
    reason: 'Family or friend support',
  },
  {
    id: 2,
    reason: 'Payment for property',
  },
  {
    id: 3,
    reason: 'Sending to self',
  },
  {
    id: 4,
    reason: 'Payment for services',
  },
];

const ReasonsModal = ({ modalVisible, closeModal, selectReason }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Open Modal</Text>
      </TouchableOpacity> */}

        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
          animationType='slide'
        >
          <View className='flex-1 justify-end bg-primary-seethrough'>
            <View style={[styles.modalContainer, { height: modalHeight }]}>
              <View className='flex-row justify-between'>
                <View className='justify-center'>
                  <Text className='text-xl font-pbold text-primary'>
                    Sending reason
                  </Text>
                </View>
                <View>
                  <TouchableOpacity onPress={closeModal}>
                    <Ionicons name='close' size={24} color='#004d40' />
                  </TouchableOpacity>
                </View>
              </View>
              <View className='w-[100%] items-center'>
                {reasons.map((reason) => (
                  <View key={reason.id} className='w-[95%]'>
                    <TouchableOpacity
                      onPress={() => selectReason(reason.reason)}
                      className='my-4 py-2 px-2'
                    >
                      <Text className='text-primary font-psemibold'>
                        {reason.reason}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default ReasonsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
