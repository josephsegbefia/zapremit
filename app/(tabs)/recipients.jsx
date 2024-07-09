import React, { useState, useCallback, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import FormField from '../../components/FormField';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import useAppwrite from '../../lib/useAppwrite';
import { getRecipients } from '../../lib/appwrite';
import EmptyState from '../../components/EmptyState';
import CustomCard from '../../components/CustomCard';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { useGlobalContext } from '../../context/GlobalProvider';
import LoadingOverlay from '../../components/LoadingOverlay';
import InfoCard from '../../components/InfoCard';

const Recipients = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');

  const [filteredRecipientsOnCountry, setFilteredRecipientsOnCountry] =
    useState([]);

  // For searching through already filtered recipients on country
  const [
    filterFilteredRecipientsOnCountry,
    setFilterFilteredRecipientsOnCountry,
  ] = useState([]);
  const [filteredRecipients, setFilteredRecipients] = useState([]);
  const [destinationCountry, setDestinationCountry] = useState('');

  const { user, transferData, setTransferData } = useGlobalContext();
  const { data: recipients, isLoading } = useAppwrite(() =>
    getRecipients(user.$id)
  );

  useEffect(() => {
    const loadRelevantRecipients = () => {
      if (transferData.identifier === 'select-existing-recipient') {
        if (user?.destinationCountry) {
          setDestinationCountry(user.destinationCountry);
          const filtered = recipients.filter((recipient) => {
            return (
              recipient.country.toLowerCase() ===
              user.destinationCountry.toLowerCase()
            );
          });
          setFilteredRecipientsOnCountry(filtered);
        }
      }
    };
    loadRelevantRecipients();
  }, [recipients]);

  // useEffect(() => {
  //   if (transferData.identifier === 'select-existing-recipient') {
  //     if (filteredRecipientsOnCountry) {
  //       setFilterFilteredRecipientsOnCountry(
  //         filteredRecipients.filter((recipient) =>
  //           recipient.firstName
  //             .toLowerCase()
  //             .includes(searchValue.toLowerCase())
  //         )
  //       );
  //     }
  //   }
  // }, [searchValue, recipients]);

  useEffect(() => {
    if (recipients) {
      setFilteredRecipients(
        recipients.filter((recipient) =>
          recipient.firstName.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    }
  }, [searchValue, recipients]);

  const renderItem = useCallback(
    ({ item }) => (
      <View className='w-full items-center'>
        <View className='w-[95%]'>
          <TouchableOpacity
            onPress={() => {
              if (transferData.identifier === 'select-existing-recipient') {
                setTransferData({
                  ...transferData,
                  recipientId: item.$id,
                  recipientFirstName: item.firstName,
                  recipientLastName: item.lastName,
                  recipientMiddleName: item.middleName,
                  recipientPhone: item.phone,
                  identifier: '',
                });
                navigation.navigate('send');
                return;
              }
              router.push({
                pathname: '/extrascreens/recipienttransfers',
                params: { item: JSON.stringify(item) },
              });
            }}
            activeOpacity={0.3}
          >
            <CustomCard
              firstName={item.firstName}
              middleName={item?.middleName}
              lastName={item.lastName}
            />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [transferData, setTransferData, navigation]
  );

  if (isLoading) {
    return (
      <View>
        <LoadingOverlay message='Loading...' />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView className='h-full bg-primary-50 flex-1'>
        <View className='my-3 px-4'>
          <View className='justify-between items-start flex-row mb-1'>
            <View>
              <Text className='mt-10 text-primary text-2xl font-pbold'>
                Recipients
              </Text>
            </View>
            <View className='mt-11'>
              <TouchableOpacity
                onPress={() => router.push('/extrascreens/addnewrecipient')}
              >
                <Ionicons name='person-add' size={24} color='#004d40' />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <FormField
              placeholder='Search recipients by first name'
              value={searchValue}
              handleChangeText={(e) => setSearchValue(e)}
            />
          </View>
        </View>
        {transferData.identifier === 'select-existing-recipient' ? (
          <>
            <View className='items-center'>
              <View className='w-[95%] my-3'>
                <InfoCard
                  title='Heads up'
                  info={`If you have added recipients in other countries, then you are only seeing recipients that belong to the selected transfer destination country, ${user.destinationCountry}`}
                  styles='text-center'
                />
              </View>
            </View>

            <FlatList
              data={filteredRecipientsOnCountry}
              keyExtractor={(item) => item.$id}
              renderItem={renderItem}
              ListHeaderComponentStyle={styles.header}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <EmptyState
                  title='No recipients found'
                  subtitle='Your transfers will appear here'
                  buttonLabel='Add recipient'
                  // handlePress={() => router.push('/extrascreens/addnewrecipient')}
                />
              )}
            />
          </>
        ) : (
          <FlatList
            data={filteredRecipients}
            keyExtractor={(item) => item.$id}
            renderItem={renderItem}
            ListHeaderComponentStyle={styles.header}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyState
                title='No recipients found'
                subtitle='Your transfers will appear here'
                buttonLabel='Add recipient'
                handlePress={() => router.push('/extrascreens/addnewrecipient')}
              />
            )}
          />
        )}

        {transferData.identifier === 'select-existing-recipient' ? (
          <View className='items-center'>
            <View className='w-[95%]'>
              <CustomButton
                title='BACK'
                handlePress={() => {
                  setTransferData({
                    ...transferData,
                    identifier: '',
                  });
                  navigation.navigate('extrascreens/selectrecipient');
                }}
              />
            </View>
          </View>
        ) : (
          ''
        )}
      </SafeAreaView>
    </>
  );
};

export default Recipients;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#e0f2f1',
  },
});
