import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import RecipientSelectOption from '../../components/RecipientSelectOption';
import React from 'react';
import InfoCard from '../../components/InfoCard';
import TransferOverView from '../../components/TransferOverView';

const SendTo = () => {
  const { transferData, setTransferData } = useGlobalContext();
  const { recipientFirstName } = transferData;

  const navigation = useNavigation();

  const selectExistingRecipient = () => {
    setTransferData({
      ...transferData,
      identifier: 'select-exisiting-recipient',
    });
    navigation.navigate('recipients');
  };

  const handleAddNewRecipientPress = () => {
    setTransferData({
      ...transferData,
      identifier: 'add-new-recipient',
    });
    navigation.navigate('extrascreens/addrecipient');
  };

  return (
    <ScrollView className='h-full bg-primary-50'>
      <SafeAreaView className='pb-10'>
        {recipientFirstName ? (
          <View className='items-center'>
            <TransferOverView />
          </View>
        ) : (
          <>
            <View className='w-[90%]'>
              <InfoCard
                title='Select an option below'
                info='Add a new recipient and send money to them, choose to import your contacts,
          this means allowing us to have access to your contact information, we promise your data is safe with us, or you can select from an exisiting recipient'
              />
            </View>

            <View>
              <View className='items-center'>
                <RecipientSelectOption
                  icon={<Ionicons name='person-add' size={30} color='white' />}
                  title='Add New Recipient'
                  handlePress={handleAddNewRecipientPress}
                />

                <RecipientSelectOption
                  icon={<AntDesign name='contacts' size={30} color='white' />}
                  title='Import Contacts'
                  handlePress={() => {}}
                />

                <RecipientSelectOption
                  icon={<AntDesign name='contacts' size={30} color='white' />}
                  title='Select Existing Recipient'
                  handlePress={selectExistingRecipient}
                />
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default SendTo;
