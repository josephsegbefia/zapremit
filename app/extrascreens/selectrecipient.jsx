import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useGlobalContext } from '../../context/GlobalProvider';
import RecipientSelectOption from '../../components/RecipientSelectOption';
import InfoCard from '../../components/InfoCard';
import useAppwrite from '../../lib/useAppwrite';
import { getRecipients } from '../../lib/appwrite';
import LoadingOverlay from '../../components/LoadingOverlay';

const SelectRecipient = () => {
  const { user, transferData, setTransferData } = useGlobalContext();

  const { data: recipients, isLoading } = useAppwrite(() =>
    getRecipients(user.$id)
  );
  const [destinationCountry, setDestinationCountry] = useState('');
  const [filteredRecipients, setFilteredRecipients] = useState([]);

  const { recipientFirstName } = transferData;

  const selectExistingRecipient = () => {
    setTransferData({
      ...transferData,
      identifier: 'select-exisiting-recipient',
    });
    router.push('/recipients');
  };

  const addNewRecipient = () => {
    setTransferData({
      ...transferData,
      identifier: 'add-new-recipient',
    });
    router.replace('/extrascreens/addnewrecipient');
  };

  useEffect(() => {
    if (user?.destinationCountry) {
      setDestinationCountry(user.destinationCountry);
      const filtered = recipients.filter((recipient) => {
        return (
          recipient.country.toLowerCase() ===
          user.destinationCountry.toLowerCase()
        );
      });
      setFilteredRecipients(filtered);
    }
  }, [user, recipients]);

  const hasRecipientsInSelectedCountry = filteredRecipients.length > 0;

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
                info='Add a new recipient and send money to them, choose to import your contacts, this means allowing us to have access to your contact information, we promise your data is safe with us, or you can select from an exisiting recipient'
                styles='px-4'
              />
            </View>

            <View>
              <View className='items-center'>
                {isLoading && <LoadingOverlay />}
                <RecipientSelectOption
                  icon={<Ionicons name='person-add' size={30} color='white' />}
                  title='Add New Recipient'
                  handlePress={addNewRecipient}
                />

                <RecipientSelectOption
                  icon={<AntDesign name='contacts' size={30} color='white' />}
                  title='Import Contacts'
                  handlePress={() => {}}
                />
                {hasRecipientsInSelectedCountry && (
                  <RecipientSelectOption
                    icon={<AntDesign name='contacts' size={30} color='white' />}
                    title='Select Existing Recipient'
                    handlePress={selectExistingRecipient}
                  />
                )}
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default SelectRecipient;
